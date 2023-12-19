import RightPartSign from "../../components/RightPartSign/RightPartSign";
import Form from "./Form";
import styles from "./SignIn.module.css";
const SignIn = () => {
  return (
    <div className={styles.container}>
      <Form />
      <RightPartSign />
    </div>
  );
};

export default SignIn;
