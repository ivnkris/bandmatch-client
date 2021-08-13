import { FaComment, FaUser } from "react-icons/fa";

import "./ProfileInfo.css";

const ProfileInfo = () => {
  return (
    <div className="profile-strip">
      <div className="musician-image-div">
        <img
          className="musician-image"
          src="https://images.unsplash.com/photo-1605973012348-ed79a941a65f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
          alt="musician name"
        />
      </div>
      <div className="musician-info-div text-center">
        <h3 className="title mb-2">BETH FORTNER</h3>
        <p className="p-yellow pb-2 text-limit-one-line">SINGER | ROCK</p>
        <p className="mb-3">OPEN TO COLLABORATION | OPEN TO JOINING A BAND</p>
        <div>
          "Nullam a dolor vitae ipsum pulvinar placerat. Cras malesuada, lectus
          et pharetra pharetra, nisl ante fermentum dui, vitae hendrerit odio mi
          ut neque. Aliquam vel justo accumsan, ultrices dolor non, lacinia
          velit. Mauris quis viverra ipsum, in mattis nunc."
        </div>

        <p className="p-yellow mt-2 text-limit-one-line">
          LOOKING FOR: <span className="looking-for">GUITARIST, DRUMMER</span>
        </p>
        <div className="profile-icon-container mt-4">
          <FaComment size={24} />
          <FaUser size={24} />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
