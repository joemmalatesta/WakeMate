import twilio from "twilio";
const accountSid = "AC2fe4e7d6a110de275db95313acb6c299";
const authToken = "4dd54669056c375fdb84a0e4aada0023";
const twilioClient = twilio(accountSid, authToken);
const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    let phoneNumber = formData.get("phone");
    let time = formData.get("time");
    if (!time) {
      console.log("here");
      return {
        output: "time failure"
      };
    }
    console.log(time);
    console.log(phoneNumber);
    let feedback = "";
    try {
      const output = await twilioClient.messages.create({
        body: `Glad to see you're serious about this...
We're giving you a 7 day trial and will wake you up at ${time} tomorrow`,
        to: phoneNumber,
        from: "+18335197545"
      }).then((message) => feedback = message.sid);
    } catch (error) {
      console.error(error);
      return {
        output: "number failure"
      };
    }
    return {
      output: feedback
    };
  }
};
export {
  actions
};
