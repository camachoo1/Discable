import './SplashPage.css';
import logo from '../../assets/logo.png';
import section2 from '../../assets/section2.svg';
import section3 from '../../assets/section3.svg';
import section4 from '../../assets/section4.svg';
import section5 from '../../assets/section5.svg';
import sparkles from '../../assets/sparkles.svg';
import { useHistory } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const SplashPage = () => {
  const history = useHistory();
  const handleClick = (e) => {
    history.push('/login');
  };
  return (
    <>
      <div className='splash-page-main'>
        <div className='splash-section-1'>
          <div className='nav'>
            <div className='nav-left'>
              <img src={logo} alt='logo' height='50px' />
            </div>
            <div className='nav-mid'>
              <a
                href='https://github.com/camachoo1/Discable'
                target='_blank'
                className='splash-page-links'
              >
                GitHub
              </a>
              <a
                href='https://linkedin.com/in/omar-camacho-aa01b3133'
                target='_blank'
                className='splash-page-links'
              >
                LinkedIn
              </a>
            </div>
            <div className='nav-right'>
              <button
                onClick={handleClick}
                className='splash-button login-button'
              >
                Login
              </button>
            </div>
          </div>
          <div className='splash-page-after-nav'>
            <h1 className='splash-page-main-heading'>
              IMAGINE A PLACE...
            </h1>
            <p>
              ...where you can belong to a school club, a gaming
              group, or a worldwide art community. Where just you and
              a handful of friends can spend time together. A place
              that makes it easy to talk every day and hang out more
              often.
            </p>
            <button
              onClick={handleClick}
              className='splash-button open-button'
            >
              Open Discable in your browser
            </button>
          </div>
        </div>

        <div className='hero-section'>
          <div className='img-container'>
            <img src={section2} alt='inv' className='all-sec-img' />
          </div>
          <div className='content'>
            <h1 className='section-header'>
              Create an invite-only place where you belong
            </h1>
            <p className='section-text'>
              Discord servers are organized into topic-based channels
              where you can collaborate, share, and just talk about
              your day without clogging up a group chat.
            </p>
          </div>
        </div>

        <div className='hero-section alternate-section'>
          <div className='content'>
            <h1 className='section-header'>
              Where hanging out is easy
            </h1>
            <p className='section-text'>
              Grab a seat in a voice channel when you’re free. Friends
              in your server can see you’re around and instantly pop
              in to talk without having to call.
            </p>
          </div>
          <div className='img-container'>
            <img src={section3} alt='txt' className='all-sec-img' />
          </div>
        </div>

        <div className='hero-section'>
          <div className='img-container'>
            <img
              src={section4}
              alt='mod-tools'
              className='all-sec-img'
            />
          </div>
          <div className='content'>
            <h1 className='section-header'>From few to a fandom</h1>
            <p className='section-text'>
              Get any community running with moderation tools and
              custom member access. Give members special powers, set
              up private channels, and more.
            </p>
          </div>
        </div>

        <div className='section-5 alternate-section'>
          <div className='content-top'>
            <h1 className='section-header-top'>
              RELIABLE TECH FOR STAYING CLOSE
            </h1>
            <p className='section-text section-text-top'>
              Low-latency voice and video feels like you’re in the
              same room. Wave hello over video, watch friends stream
              their games, or gather up and have a drawing session
              with screen share.
            </p>
            <img
              src={section5}
              alt='reliable'
              className='bigger-img'
            />
          </div>
        </div>

        <div className='section-6'>
          <div className='section-6-content'>
            <img
              src={sparkles}
              alt='sparkles-banner'
              className='sparkles'
            />
            <h1 className='sparkles-header'>
              Ready to start your journey?
            </h1>
            <button
              onClick={handleClick}
              className='splash-button bigger-button'
            >
              Open Discable
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SplashPage;
