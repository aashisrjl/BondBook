import { create } from "twrnc";
import tailwindConfig from "./tailwind.config"; // Import your Tailwind config

const tw = create(tailwindConfig); // Pass the config to twrnc

export default tw;
