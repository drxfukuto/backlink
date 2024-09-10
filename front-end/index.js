const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Sử dụng axios

const app = express();
const PORT = 3000;

// Cho phép tất cả các nguồn (origin) truy cập vào server này

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));
app.use(express.json());

app.post('/fetch-url', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).send({ error: 'URL không được cung cấp' });
    }

    try {
        // Gửi yêu cầu đến liên kết do người dùng nhập
        const response = await axios.get(url);
        const html = response.data;

        // Trả lại nội dung HTML cho frontend
        res.send({ html });
    } catch (error) {
        console.error('Lỗi khi truy cập liên kết:', error.message);
        res.status(500).send({ error: 'Không thể truy cập liên kết' });
    }
});

app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});


