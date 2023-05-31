const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const mongoose = require('mongoose');

const Favorite = require('./models/favorite');

const app = express();
//이예시는 그냥 실행하면 동작하지 않고 
//docker 도움없이 실행하려면..
//MongoDB (mongodb.com)에 가서 서버로 가서 설치문서를 보고 실행하면 됨
//MongoDB는 이미지(컨테이너)에 포함되지 않음...!
//별도의 컨테이너로 돌려 컨테이너끼리 커뮤니케이션을 하도록 만들 것
app.use(bodyParser.json());
//이 예시는 http파일을 받아오지 않고 데이터만 가져옴..
app.get('/favorites', async (req, res) => {
  const favorites = await Favorite.find();
  res.status(200).json({
    favorites: favorites,
  });
});
//데이터를 가져오면 mongoose 데이터베이스에 저장을 시도함
app.post('/favorites', async (req, res) => {
  const favName = req.body.name;
  const favType = req.body.type;
  const favUrl = req.body.url;

  try {
    if (favType !== 'movie' && favType !== 'character') {
      throw new Error('"type" should be "movie" or "character"!');
    }
    const existingFav = await Favorite.findOne({ name: favName });
    if (existingFav) {
      throw new Error('Favorite exists already!');
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const favorite = new Favorite({
    name: favName,
    type: favType,
    url: favUrl,
  });

  try {
    await favorite.save();
    res
      .status(201)
      .json({ message: 'Favorite saved!', favorite: favorite.toObject() });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.get('/movies', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/films');
    res.status(200).json({ movies: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.get('/people', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/people');
    res.status(200).json({ people: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});
//connect아래에 들어갈 localhost라는 이름의 ip는 container의 이름으로 설정하면
//docker에서 network를 설정할 때 해당 이름의 container의 ip를 자동으로 할당해줌
//물론 해당 상황이 동작하려면 연결하려는 container가 같은 docker network에 있어야 함

mongoose.connect(
  'mongodb://localhost:27017/swfavorites',
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(3000);
    }
  }
);
