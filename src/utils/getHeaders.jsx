const projectID = 'vv9q2o5880o8'
export const apiURL = 'https://academics.newtonschool.co/api/v1'

const authToken = localStorage.getItem("authToken");

export const headerWithProjectIdOnly = () => {
    return {
      headers: {
        projectID: projectID,
      },
    };
  };
export const headerWithJWT = () => {
    return {
      headers: {
        projectID: projectID,
        Authorization: `Bearer ${authToken}`
      },
    };
  };