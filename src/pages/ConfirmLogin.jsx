import React from "react";

function ConfirmLogin() {
  return (
    <div className="container">
      <div className="confirmation">
        <img
          src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWw0bjkyNXZsNHlneGRhZ3V0d2Q0a21hazF2aTJuMTE0eHp0dTRrcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0Ul3g0DvDMdsFAn7NN/giphy.gif"
          className="confirmation--img"
        />
        <h1 className="confirmation--h1">Magic link is in your inbox</h1>
        <p className="confirmation--p">
          We also hate passwords. So we just emailed you with a confirmation
          link. Click it to sign-in! ✅
        </p>
      </div>
    </div>
  );
}

export default ConfirmLogin;
