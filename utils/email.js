const nodemailer=require('nodemailer');

const sendEmail=async(options)=>{
    //create a transporter
    // host:process.env.EMAIL_HOST,
   // port:process.env.EMAIL_PORT,
    const transporter=nodemailer.createTransport({
       service:'gmail',
        auth:{
            type:'OAuth2',
            user:process.env.EMAIL_USERNAME,
            clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        },
    });



    const mailOptions={
        from:` Vrbanus <${process.env.EMAIL_USERNAME}>`,// this will be to whoever is the admin, developer or just owner of the site
        to:options.email,//'marcelodev89@gmail.com' or to customers depends where i want
        subject:options.subject,
        html:options.html  //html to make it pretty
    };

    await transporter.sendMail(mailOptions);
}


module.exports=sendEmail;