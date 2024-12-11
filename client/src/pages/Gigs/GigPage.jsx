import { role, userdetails } from "../../api";
import CreateGig from "../../components/Creategig";
import { useAuth } from "../../context/AuthContext";
import GigsList from "./GigsList";

const GigPage = () => {
  const {user} = useAuth()
  const reload = () => {
    window.location.reload(); // Reloads the current page
  };

  console.log(user.role);
  

  return (
    <div>
      {user.role == "ecohero" ? <div>  </div> : <CreateGig onGigCreated={reload} />}
      <GigsList />
    </div>
  );
};

export default GigPage;
