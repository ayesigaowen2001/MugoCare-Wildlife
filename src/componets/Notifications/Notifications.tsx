import { Card } from "primereact/card";

const Notifications = () => {
  return (
    <div className="overflow-scroll" style={{ height: "500px" }}>
      <Card className="shadow-2 col-2 w-max h-full">
        <h5 color="fixed top-0 left-0 px-2 py-3 w-full font-bold">
          Notifications
        </h5>
      </Card>
    </div>
  );
};

export default Notifications;
