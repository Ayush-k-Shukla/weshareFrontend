// import React, { useEffect, lazy, Suspense } from 'react';
// import {
//   Container,
//   Paper,
//   Image,
//   CardMedia,
//   CircularProgress,
//   Typography,
//   Divider,
//   Button,
//   LinearProgress,
// } from '@material-ui/core';
// import Tag from './Tag';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getPost, getPostsBySearch } from '../../actions/posts';
// import useStyles from './styles.js';
// import moment from 'moment';
// import Loader from '../Loader/Loader';

// import ReactHtmlParser from 'react-html-parser';

// const DummyIndividual = () => {
//   const { post, isLoading, posts } = useSelector((state) => state.posts);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   console.log(posts);
//   const classes = useStyles();
//   const { id } = useParams();
//   const dummyString = `<h1>Top skills a full stack developer should have</h1>
// <img src="https://blog-c7ff.kxcdn.com/blog/wp-content/uploads/2015/11/blog_dev-01-1.jpg" alt="undefined" style="height: 100%;width: 100%"/>
// <p><strong>Defining, describing, and drawing you a picture…</strong></p>
// <p>I’m going to use the most popular example to define a full-stack developer. If there’s one person who wore many hats in his lifetime, it’sLeonardo Da Vinci. He was a painter, scientist, mathematician, cartographer, geologist, astronomer, historian, musician, and sculptor. People believe that diverse experiences fed into his creative genius, making him a nonpareil innovator.</p>
// <p>If this extraordinary Renaissance man was a programmer today, he would be what we call a “full-stack” developer. Murky picture becoming a little clearer, I hope.</p>
// <p>Developers now identify with over 24 such specific job titles, including front-end web developer, back-end web developer, mobile developer, and desktop developer. Understandably, nomenclature is becoming increasingly complex to work with. It is often restrictive (and unfair) to have one job title to describe your distinct skill sets. For instance, consider the findings of a 2015 survey by Stack Overflow: for the third year in a row, a majority of respondents (30%) identified themselves as “full stack developers” when asked to categorize their occupation.</p>
// <p>Full stack developers are ordinary mortals like the rest of us. Michael Wales of Udacity describes a full stack developer as one who can work cross-functionally on the full “stack” of technology, i.e. both thefront end and back end. In layman’s terms, they are jacks of all trades and masters of one (or many, as opposed to none).</p>
// <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.hackerearth.com/blog/developers/top-skills-a-full-stack-developer-should-have/" target="_blank">Source</a>&nbsp;</p>
// <p>For full stack development, you need to understand</p>
// <p></p>
// <ul>
// <li>Hosting systems (the computer; the OS; and supporting services like DNS, SSH, email, and Apache)</li>
// <li><span style="color: rgb(240,248,255);background-color: rgb(47,79,79);font-size: medium;font-family: Roboto, Helvetica, Arial, sans-serif;">Application stack (web server like Apache or IIS; relational database like Oracle, MySQL, and PostgreSQL; and dynamic server-side web languages like Python, PHP, NodeJS, and Ruby)</span>&nbsp;</li>
// </ul>
// <p>Web applications (model view controller framework like Agavi, Django, and Turbine; object relational modeling like Propel, SQL Alchemy, and Torque; and models, views, application logic, and front-end development including audio, video, HTML, CSS, and JavaScript).</p>
// <p></p>
// <img src="https://blog-c7ff.kxcdn.com/blog/wp-content/uploads/2015/11/blog_dev-01-1.jpg" alt="undefined" style="height: 100%;width: 100%"/>
// <p></p>
// <p><strong>Talking about some key skills full stack developers need to have…</strong></p>
// <p></p>
// <p>Over the past few years, the full stack has become “fuller.” In simpler times, a stack was rather straightforward and consisted of the LAMP (Linux, Apache, MySQL, and PHP) or MEAN (MongoDB, ExpressJS, AngularJS, and NodeJS). But with the advent of tooling, cloud services, design, data, and networking, full stack developers now have to deal with a whole new ball game.</p>
// <p>Every full stack developer is different and has his/her unique combination of skills suitable for specific startups. The first step is to decide where one’s core competencies lie (back-end vs. front-end) and where it is enoughto know just the bare necessities.</p>
// <p></p>`;

//   return (
//     <div>
//       <div style={{ padding: '40px 140px' }}>
//         <div className={classes.card}>
//           <div className={classes.section}>
//             <Typography
//               gutterBottom
//               variant='body1'
//               component='p'
//               style={{
//                 fontWeight: 'font-weight: 600',
//                 color: '#d5d5d5',
//               }}
//             >
//               {ReactHtmlParser(dummyString)}
//             </Typography>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DummyIndividual;

import React, { useEffect, lazy, Suspense } from 'react';
import {
  Container,
  Paper,
  Image,
  CardMedia,
  CircularProgress,
  Typography,
  Divider,
  Button,
  LinearProgress,
} from '@material-ui/core';

import ReactHtmlParser from 'react-html-parser';

import Tag from './Tag';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles.js';
import moment from 'moment';
import Loader from '../Loader/Loader';

const CardRecommended = lazy(() => import('./CardRecommended'));
const CommentSection = lazy(() => import('./CommentSection'));
// import CardRecommended from './CardRecommended';
// import CommentSection from './CommentSection';

const DummyIndividual = () => {
  const { post, isLoading, posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(posts);
  const classes = useStyles();
  const { id } = useParams();

  // var scrollLeft = element.scrollLeft;

  useEffect(() => {
    console.log('first');
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      console.log('secon');
      dispatch(
        getPostsBySearch({ search: 'none', tags: post?.data?.tags.join(',') })
      );
    }
  }, [post]);

  if (isLoading) {
    return <Loader />;
  }
  if (!post) return null;

  const recommendedPosts = posts?.filter((pos) => pos._id !== post?.data?._id);
  console.log(recommendedPosts);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ padding: '40px 140px' }}>
          <div>
            <Typography
              variant='h3'
              component='h2'
              style={{ color: 'antiquewhite' }}
            >
              {post.data.title}
            </Typography>
          </div>

          <div
            style={{
              color: '#91b2e0',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {' '}
            <Typography variant='h6'>Created by: {post.data.name}</Typography>
            <Typography variant='body1'>
              {moment(post.data.createdAt).format('MMM Do YY')}
            </Typography>
          </div>
          <div className={classes.card}>
            <div className={classes.section}>
              <Typography
                gutterBottom
                variant='h6'
                color='textSecondary'
                component='h2'
                style={{ display: 'flex', justifyContent: 'start' }}
              >
                {post?.data?.tags?.map((tag) => (
                  <Tag value={tag} />
                ))}
              </Typography>

              <Typography
                gutterBottom
                variant='body1'
                component='p'
                style={{
                  fontWeight: 'font-weight: 600',
                  color: '#d5d5d5',
                }}
              >
                {ReactHtmlParser(post.data.message)}
              </Typography>
            </div>
          </div>

          <CommentSection post={post.data} />

          <Divider style={{ margin: '20px 0', color: '#044ac5' }} />

          {recommendedPosts?.length && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignSelf: 'flex-start',
                flexWrap: 'wrap',
              }}
            >
              {/* <Button onClick={() => scroll(-20)}>LEFT</Button> */}
              {recommendedPosts.map((post) => (
                <CardRecommended post={post} />
              ))}
              {/* <Button onClick={() => scroll(20)}>RIGHT</Button> */}
            </div>
          )}
          {/* </Suspense> */}
        </div>
      )}
    </div>
  );
};

export default DummyIndividual;
