import ProfileInfo from "../../components/ProfileInfo";
import SoundCloudWidget from "../../components/SoundCloudWidget";
import "./MusicianProfile.css";

const MusicianProfile = (props) => {
  return (
    <div className="profile-container">
      <div className="p-3"></div>
      <ProfileInfo />

      <SoundCloudWidget soundCloudUrl="https://w.soundcloud.com/player/?url=https://soundcloud.com/oliviarodrigo/good-4-u-1" />
    </div>
  );
};

export default MusicianProfile;
