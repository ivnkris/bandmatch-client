import ProfileInfo from "../../components/ProfileInfo";
import SoundCloudWidget from "../../components/SoundCloudWidget";
import "./MusicianProfile.css";

const MusicianProfile = (props) => {
  return (
    <div className="profile-container">
      <div className="p-3"></div>
      <ProfileInfo />
      <SoundCloudWidget />
    </div>
  );
};

export default MusicianProfile;
