const nodemailer=require('nodemailer');

//i will create an async function that calls this emailProvid4r:

const sendEmail=async(options)=>{
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            type:'OAuth2',
            user:process.env.EMAIL_USERNAME,
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            refreshToken:process.env.GOOGLE_REFRESH_TOKEN
        }
    });

const mailOptions={
    from:'Vrbanus <marcelodev89@gamil.com>',
    to:options.to,
    subject:options.subject,
    html:options.html
}

const info=await transporter.sendMail(mailOptions);
return info;

}

module.exports=sendEmail;

//and then when i import and call it somewhere
//it would be like this:

//let say const messageHtml=`<h1>Hello world</h1>`

// we have to call it with await because it is an async function
//await sendEmail({
// to:options.email
//subject:'my subject'
//html:messageHtml


//})