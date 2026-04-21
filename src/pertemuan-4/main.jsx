import { createRoot } from "react-dom/client";
import './tailwind.css';
import TasWanitaApp from "./TasWanitaApp";

createRoot(document.getElementById("root"))
    .render(
        <div>
              <TasWanitaApp/> 
        </div>
    );
