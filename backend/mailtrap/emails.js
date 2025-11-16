import { verificationEmailTemplate} from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrapConfig.js"

export const sendVerificationEmail= async (email, verificationToken)=>{
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject:"Verify Your email",
            html: verificationEmailTemplate.replace("{code}", verificationToken),
            category: "Email Verification"


        })
        console.log("Email sent successfully", response)
        
    } catch (error) {
        console.error(`error sending verification`, error);
        throw new Error(`Error sending verificaion email: ${error}`);
        
    }

}