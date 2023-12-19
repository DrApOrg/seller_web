import RightPartSign from "../../components/RightPartSign/RightPartSign";
import Form from "./Form";
import styles from "./SignUp.module.css";
const SignUp = () => {
  return (
    <div className={styles.container}>
      <Form />
      <RightPartSign />
    </div>
  );
};

export default SignUp;
