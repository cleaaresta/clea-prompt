export default function Image({
  src,
  alt = '',
  width,
  height,
  rounded = false,
  className = '',
  ...props
}) {
  const cls = [
    'glamour-image',
    rounded ? 'glamour-image-rounded' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cls}
      loading="lazy"
      {...props}
    />
  )
}
