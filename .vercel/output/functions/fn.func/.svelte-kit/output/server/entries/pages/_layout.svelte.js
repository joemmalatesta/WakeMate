import { c as create_ssr_component, v as validate_component } from "../../chunks/index.js";
const app = "";
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<nav class="flex justify-between md:justify-around items-center py-5 mx-4"><a href="/"><img src="/sun.svg" alt="Logo" class="md:w-16 w-12"></a>
	<ul class="flex gap-6 text-lg"><li><a class="hover:text-[#786afa]" href="#pricing">Pricing</a></li>
		<li><a class="hover:text-[#786afa]" href="/signUp">Sign Up</a></li></ul></nav>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
  ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
