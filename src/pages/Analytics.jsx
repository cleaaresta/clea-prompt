import React, { useState, useEffect } from 'react';
import { fetchAnalytics, fetchMonthlyRevenue } from '../lib/analyticsApi';
import { PageHeaderSection, PanelSection } from '../components/6-section';
import { Table as CustomTable } from '../components/3-data-display';
import { FadeIn, SlideUp } from '../components/15-animation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
};

const COLORS = {
  bronze: '#cd7f32',
  silver: '#c0c0c0',
  gold: '#ffd700'
};

const DEFAULT_PRODUCT_IMAGE = "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80";

export default function Analytics() {
  const [data, setData] = useState({
    stats: { total_revenue: 0, successful_orders: 0, pending_orders: 0, total_members: 0 },
    topProducts: [],
    tierDist: []
  });
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [analyticsData, revenueData] = await Promise.all([
          fetchAnalytics(),
          fetchMonthlyRevenue()
        ]);
        setData(analyticsData);
        setMonthlyRevenue(revenueData);
      } catch (error) {
        console.error('Failed to load analytics data', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-stone-500">Loading analytics...</div>;
  }

  const { stats, topProducts, tierDist } = data;

  const pieData = tierDist.map((item) => ({
    name: item.tier_name.charAt(0).toUpperCase() + item.tier_name.slice(1),
    value: Number(item.member_count),
    color: COLORS[item.tier_name.toLowerCase()] || '#8884d8'
  }));

  const productColumns = [
    {
      key: 'image_url',
      label: 'Image',
      render: (val) => (
        <div className="h-10 w-10 overflow-hidden rounded-md border border-stone-200 flex-shrink-0 flex items-center justify-center">
          <img
            src={val || DEFAULT_PRODUCT_IMAGE}
            alt="Product"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
            }}
          />
        </div>
      )
    },
    { 
      key: 'name', 
      label: 'Product Name', 
      cellClassName: 'font-medium text-stone-800',
      render: (val, row) => val || row.product_name || "Unknown Product"
    },
    { key: 'total_qty_sold', label: 'Sold (Qty)' },
    {
      key: 'total_sales_amount',
      label: 'Revenue',
      render: (val) => formatRupiah(val)
    }
  ];

  return (
    <section>
      <FadeIn>
        <PageHeaderSection
          title="Analytics & Reports"
          subtitle="View and analyze your store's performance metrics and reports."
        />
      </FadeIn>

      <SlideUp delay="0s">
        <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', marginBottom: '24px' }}>
          <div className="metric-card pink-card">
            <h3 className="metric-label">Total Revenue</h3>
            <h2 style={{ fontSize: '1.5rem' }}>{formatRupiah(stats.total_revenue)}</h2>
          </div>
          <div className="metric-card purple-card">
            <h3 className="metric-label">Successful Orders</h3>
            <h2>{stats.successful_orders}</h2>
          </div>
          <div className="metric-card gold-card">
            <h3 className="metric-label">Pending Orders</h3>
            <h2>{stats.pending_orders}</h2>
          </div>
          <div className="metric-card pink-card">
            <h3 className="metric-label">Total Members</h3>
            <h2>{stats.total_members}</h2>
          </div>
        </div>
      </SlideUp>

      <SlideUp delay="0.1s">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <PanelSection title="Monthly Revenue">
              <div className="h-[300px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenue} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280' }}
                      tickFormatter={(value) => `Rp${(value / 1000000).toFixed(0)}M`}
                    />
                    <Tooltip
                      formatter={(value) => formatRupiah(value)}
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Bar dataKey="revenue" fill="#9a475d" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </PanelSection>
          </div>

          <div className="lg:col-span-1">
            <PanelSection title="Member Distribution">
              <div className="h-[300px] w-full flex items-center justify-center pt-4">
                {pieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-stone-400 text-sm">No member data available</div>
                )}
              </div>
            </PanelSection>
          </div>
        </div>
      </SlideUp>

      <SlideUp delay="0.2s">
        <PanelSection title="Top Products">
          {topProducts.length > 0 ? (
            <CustomTable columns={productColumns} data={topProducts} />
          ) : (
            <div className="py-8 text-center text-stone-500">
              No products sold yet.
            </div>
          )}
        </PanelSection>
      </SlideUp>
    </section>
  );
}
