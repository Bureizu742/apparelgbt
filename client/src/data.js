import path from 'path';
const { PUBLIC_URL } = process.env;
const imgTwo = `${path.join(PUBLIC_URL,'assets/sets/loungepaired.jpeg')}`;
const imgThree = `${path.join(PUBLIC_URL,'assets/bottoms/denim.jpeg')}`;
const set1 = `${path.join(PUBLIC_URL,'assets/sets/linenset.jpeg')}`
const mset1 = `${path.join(PUBLIC_URL,'assets/sets/loungepaired2.jpeg')}`
const miset2 = `${path.join(PUBLIC_URL,'assets/sets/suits.jpeg')}`
const top5 = `${path.join(PUBLIC_URL,'assets/tops/linentops.jpeg')}`
const top4 = `${path.join(PUBLIC_URL,'assets/tops/lovetee.jpeg')}`
const top3 = `${path.join(PUBLIC_URL,'assets/tops/noshirtpaired.jpeg')}`
const rainbow = `${path.join(PUBLIC_URL,'assets/tops/rainbowSweater.jpeg')}`
const sweatersgroup = `${path.join(PUBLIC_URL,'assets/tops/sweatersgroup.jpeg')}`
const denimchair = `${path.join(PUBLIC_URL,'assets/bottoms/denimchair.jpeg')}`

export const carouselItems = [
  {
  id: 1,
  img: rainbow,
  title: "RAINBOW COLLECTION",
  description: "20% OFF THROUGH JUNE",
},
  {
  id: 2,
  img: imgTwo,
  title: "COZY CORE",
  description: "SHOP OUR NEW DROPS",
},
  {
  id: 3,
  img: imgThree,
  title: "DENIM DARLINGS",
  description: "SELECT JEANS UP TO 40% OFF",
},
]

export const categories = [
  {
    id:1 ,
    img: denimchair,
    title: "CLASSIC DENIM",
    category: "bottoms"
  },
  {
    id:2 ,
    img: sweatersgroup,
    title: "STAPLE TOPS",
    cat: "tops"
  },
  {
    id:3 ,
    img: mset1,
    title: "LOUNGEWEAR",
    cat: "sets"
  },
]

export const topProducts = [
  {
    id: 1,
    img: set1,
  },
  {
    id: 2,
    img: mset1,
  },
  {
    id: 3,
    img: miset2,
  },
  {
    id: 4,
    img: top5,
  },
  {
    id: 5,
    img: top4,
  },
  {
    id: 6,
    img: top3,
  },
]
