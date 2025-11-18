import { verificationEmailTemplate, Password_Reset_Request_Template, Password_Reset_Sucessfull_Template} from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrapConfig.js"

export const sendVerificationEmail= async (email, verificationToken)=>{
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject:"Verify Your email",
            html: verificationEmailTemplate.replace("{code}", verificationToken),
            category: "Email Verification",


        });
        console.log("Email sent successfully", response)
        
    } catch (error) {
        console.error(`error sending verification`, error);
        throw new Error(`Error sending verificaion email: ${error}`);
        
    }

}


export const sendWelcomeEmail = async (email, name)=>{
    const recipient = [{email}];

    try {
     const response  = await mailtrapClient.send({
            from : sender,
            to: recipient,
            template_uuid: "2bbb1228-2fc3-401a-ba9d-10767cf8f87f",
    template_variables: {
      "company_info_name": "Mail_AuthCompnay",
      name: name,
    }
,
        });
        console.log("Welcome Email sent sucessfully", response);

        
    } catch (error) {

        throw new Error("Not sent welcome mail");


        
    }

};


export const sendForgetPasswordEmail= async (email, resetURl)=>{
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Your Password",
            html: Password_Reset_Request_Template.replace("{resetURL}", resetURl),
            category: "Password Reset"
        })
        
    } catch (error) {
        console.error("Got erron while requesting reset password", error);

        throw new Error(`Error sending password reset email: ${error}`);
        
    }
};


export const sendResetSucessEmail= async (email) =>{
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to : recipient,
            subject: "Password Reset Successfull",
            html: Password_Reset_Sucessfull_Template,
            category: "Password Reset",

        });
    } catch (error) {
        console.log("Error while sending reset sucess mail", error);
        throw new Error("The error while resting password is ", `${error}`);

        
    }
}


