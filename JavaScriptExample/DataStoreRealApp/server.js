const fs = require('fs').promises;
const exists = require('fs').exists;
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use('/feedback', express.static('feedback'));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'feedback.html');
  res.sendFile(filePath);
});

app.get('/exists', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'exists.html');
  res.sendFile(filePath);
});

app.post('/create', async (req, res) => {
  const title = req.body.title;
  const content = req.body.text;

  const adjTitle = title.toLowerCase();

  const tempFilePath = path.join(__dirname, 'temp', adjTitle + '.txt');
  const finalFilePath = path.join(__dirname, 'feedback', adjTitle + '.txt');

  await fs.writeFile(tempFilePath, content);
  exists(finalFilePath, async (exists) => {
    if (exists) {
      res.redirect('/exists');
    } else {
      //아래의 rename은 다중 파일 접속 경로에서는 지원하지 않음 : 볼륨으로 파일을 저장하기 위해 변경해야할 사항
      //await fs.rename(tempFilePath, finalFilePath);
      //아래와 같이 파일을 복사한 뒤에
      await fs.copyFile(tempFilePath, finalFilePath);
      //수동으로 파일을 삭제...
      await fs.unlink(tempFilePath);
      res.redirect('/');
    }
  });
});

app.listen(80);
