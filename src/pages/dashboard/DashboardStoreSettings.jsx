import React from "react";
import StoreSettingContainer from "../../components/dashboard/storeSettingsComponents/StoreSettingContainer";

const DashboardStoreSettings = () => {
  return (
    <div className="py-5 px-5 md:px-10 w-full bg-container flex flex-col items-start gap-4 rounded-xl">
      <StoreSettingContainer />
    </div>
  );
};

export default DashboardStoreSettings;
