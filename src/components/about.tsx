import architecture from '../assets/images/cs484-white-bg.jpg';

function About() {
  return (
    <div style={{ padding: '15px 0px 10px 0px', width: '800px', margin: 'auto' }}>
      <div
        style={{
          color: '#05395c',
          fontWeight: '600',
          lineHeight: '1.1',
          margin: '0px 0px 10px 0px',
          fontSize: 'clamp(40px, 8vw, 80px)',
          alignContent: 'center',
        }}
      >
        Architecture Diagram
      </div>

      <img src={architecture} alt="arch" style={{ width: '100%', border: '3px solid #05395c' }} />
      <div>
        <h2 style={{ textDecorationLine: 'underline', color: '#05395c', alignItems: 'center' }}>
          Minimum Viable Product Description
        </h2>
        We will display the tweets of a particular follower of a user. We will use OAuth with
        Twitter for user login and then use the twitter api to get a list of his followers. We will
        use the list returned to chose two random followers and display their tweets. We are using
        Supabase database for backend and React for frontend. We will use Github for version control
        along with netlify for CICD and hosting.
      </div>
    </div>
  );
}

export default About;
