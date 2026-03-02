import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { name, email, phone, org, role, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "kavachvajra@gmail.com",
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    try {
        await transporter.sendMail({
            from: "KAVACH Vajra <kavachvajra@gmail.com>",
            to: "kavachvajra@gmail.com",
            subject: "New Demo Request - KAVACH Vajra",
            text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Organization: ${org}
Role: ${role}

Message:
${message}
      `,
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false });
    }
}