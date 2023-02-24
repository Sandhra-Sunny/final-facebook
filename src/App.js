import React, { useState, useEffect } from "react";
import { Select, Dropdown } from "antd";
import FacebookLogin from "react-facebook-login";
import axios from "axios";

function App() {
  const [matchedPosts, setMatchedPosts] = useState([]);
  const [userData, setUserData] = useState();

  console.log(userData)

  const items = ["Restaurant", "Beauty", "Fashion"];

  const componentClicked = () => {
    console.log("Facebook button clicked");
  };

  const responseFacebook = (response) => {
    setUserData(response);
    console.log("userData: ", response);
    axios
      .post("http://localhost:3000/api/facebook", {
        accessToken: response.accessToken,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const handleMenuClick = async (e) => {
   const data = await axios.post("http://localhost:3000/api/posts", {
      data: e
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    console.log(data)
    setMatchedPosts(data.data)
  };

  return (
    <div className="App">
      {!userData ? (
        <div>
            <h1>Login With Facebook</h1>
        
        <FacebookLogin
          appId="510971874509018"
          autoLoad={true}
          fields={
            "name,email, picture,last_name,first_name,gender,friends,birthday,likes,posts"
          }
          onClick={componentClicked}
          callback={responseFacebook}
        />
          </div>
      ) :
      (
        <div>
        <h1>Influencer Recommedation</h1>
        search here<Select onChange={handleMenuClick} size="large">
        {items.map((item) => (
          <Select.Option key={item}>{item}</Select.Option>
        ))}
      </Select>
        {/* <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            {selectedItem} ▼
          </a>
        </Dropdown> */}
        {matchedPosts.length > 0 && (
          <div>
            <h2>Matched Posts:</h2>
            <ul>
              {matchedPosts.map((post) => (
                <li key={post.id}>{post.name}</li>
              ))}
            </ul>
          </div>
        )}
        </div>
      )}
          

    </div>
  );
}

export default App;





















