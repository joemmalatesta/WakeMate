import { c as create_ssr_component, d as each, e as escape, f as add_attribute, v as validate_component } from "../../chunks/index.js";
import { inject } from "@vercel/analytics";
const Pricing = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pricingOptions = [
    {
      type: "Trial",
      numbers: 1,
      price: "Free",
      calls: 1,
      texts: "❌"
    },
    {
      type: "Basic",
      numbers: 1,
      price: "$5/mo",
      calls: 1,
      texts: 1
    },
    {
      type: "Pro",
      numbers: 1,
      price: "$10/mo",
      calls: "Up to 3",
      texts: 3
    },
    {
      type: "Family",
      numbers: "Up to 5",
      price: "$25/mo",
      calls: "Up to 3",
      texts: 3
    }
  ];
  return `<div class="flex justify-around md:flex-row flex-col items-center">${each(pricingOptions, (option) => {
    return `<div class="p-5 flex flex-col ring ring-indigo-600 rounded-lg w-80 bg-indigo-100/5 text-lg my-3"><h5 class="text-2xl font-bold text-center">${escape(option.type)} - ${escape(option.price)}</h5>
			<ul class="flex flex-col mx-2"><div class="flex justify-between items-center my-1"><p>Numbers</p>
					<p>${escape(option.numbers)}</p></div>
				<div class="flex justify-between items-center my-1"><p>Wake up call</p>
					<p>${escape(option.calls)}</p></div>
				<div class="flex justify-between items-center my-1"><p>Daily texts</p>
					<p>${escape(option.texts)}</p>
				</div></ul>
			<button class="w-full bg-indigo-400 hover:bg-indigo-500 p-2 rounded-lg text-black">Purchase</button>
		</div>`;
  })}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  inject();
  let { form } = $$props;
  let times = [
    "4:00am",
    "5:00am",
    "6:00am",
    "7:00am",
    "8:00am",
    "4:30am",
    "5:30am",
    "6:30am",
    "7:30am",
    "8:30am"
  ];
  let selectedTime = -1;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `
<main class="lg:mx-40 mx-4 mt-16"><div class="relative text-center md:text-7xl text-5xl font-extrabold"><h1 class="">Take back your morning</h1>
		<p class="absolute inset-0 blur opacity-40">Take back your morning</p></div>
	<p class="text-center md:text-xl font-extrabold mt-4 text-[#d2cff0]">Get a wake up call each morning, giving you motivation for the day ahead
	</p>

	
	<form method="POST" class="flex justify-center items-center flex-col mt-8"><input class="w-full xl:w-1/3 lg:w-3/5 p-3 text-black md:text-2xl text-xl placeholder:text-center rounded-t-lg placeholder:text-neutral-700/80" type="tel" name="phone" inputmode="numeric" id="phone" placeholder="Your phone number">
		<ul class="flex flex-wrap justify-between items-center w-full xl:w-1/3 lg:w-3/5">${each(times, (time, index) => {
    return `<button class="${"w-1/5 h-12 flex justify-center items-center border border-[#5a4ecc] cursor-pointer " + escape(selectedTime == index ? "bg-[#4437b0]" : "bg-[#786afa]", true)}">${escape(time)}</button>`;
  })}</ul>

		<input class="hidden" name="time"${add_attribute("value", times[selectedTime] || null, 0)}>
		<button type="submit" class="w-full bg-[#4437b0] hover:bg-[#2e257a] p-3 xl:w-1/3 lg:w-3/5 rounded-b-lg md:text-2xl text-xl font-semibold drop-shadow-lg">Wake me up</button>
		${form?.output === "time failure" ? `<p class="text-red-400 font-thin">Select wake up time</p>` : `${form?.output === "number failure" ? `<p class="text-red-400 font-thin">Enter valid phone number</p>` : ``}`}</form>

	

	<section id="pricing" class="my-40"><div class="relative text-center md:text-6xl text-4xl font-extrabold mb-7"><h1 class="">Pricing</h1>
			<p class="absolute inset-0 blur opacity-40">Pricing</p></div>
		${validate_component(Pricing, "Pricing").$$render($$result, {}, {}, {})}</section></main>`;
});
export {
  Page as default
};
