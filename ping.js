var ping = require('ping');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'mail.from@gmail.com',
        pass: 'SECRET!!'
    }
});

var mailOptions = {
    from: 'mail.from@gmail.com',
    to: 'mail.to@gmail.com',
    subject: 'Ping Failed!!',
    text: 'Ping Failed!!'
};

var hosts = ['192.168.1.10'];
hosts.forEach(function(host){
    ping.sys.probe(host, function(isAlive){
        var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        console.log(msg);
    if (!isAlive) {
        transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                }else{
                    console.log('Message sent: ' + info.response);
                }
        });
        }
    });
});