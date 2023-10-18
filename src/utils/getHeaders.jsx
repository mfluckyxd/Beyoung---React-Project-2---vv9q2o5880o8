const projectID = 'vv9q2o5880o8'
export const apiURL = 'https://academics.newtonschool.co/api/v1'


export const headerWithProjectIdOnly = () => {
    return {
      headers: {
        projectID: projectID,
      },
    };
  };