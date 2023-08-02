import React, { useEffect, useState } from 'react';

const ModeratorPage = ({ userToken }) => {
  const [userAccounts, setUserAccounts] = useState([]);
  const [contestedPosts, setContestedPosts] = useState([]);

  useEffect(() => {
    fetchUserAccounts(userToken)
      .then((data) => {
        setUserAccounts(data);
      })
      .catch((error) => {
        console.error('Error fetching user accounts:', error);
      });

    fetchContestedPosts()
      .then((data) => {
        setContestedPosts(data);
      })
      .catch((error) => {
        console.error('Error fetching contested posts:', error);
      });
  }, [userToken]);

  const fetchUserAccounts = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await response.json();
      return userData;
    } catch (error) {
      throw new Error('Error fetching user accounts');
    }
  };

  const fetchContestedPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/posts');
      const contestedPostsData = await response.json();
      return contestedPostsData;
    } catch (error) {
      throw new Error('Error fetching contested posts');
    }
  };

  const UserAccountBanToggle = async (DoD_id, isBanned) => {
    try {
      const updatedStatus = !isBanned;
      await UserAccountStatus(DoD_id, updatedStatus, userToken);

      setUserAccounts((prevUserAccounts) =>
        prevUserAccounts.map((user) =>
          user.DoD_id === DoD_id ? { ...user, isBanned: updatedStatus } : user
        )
      );
    } catch (error) {
      console.error('Error toggling user account status:', error);
    }
  };

  const UserAccountStatus = async (DoD_id, updatedStatus, token) => {
    try {
      await fetch(`http://localhost:8080/user/${DoD_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isBanned: updatedStatus }),
      });
    } catch (error) {
      throw new Error('Error updating user account status');
    }
  };

/*

const contestedPostModeration = (postId, isApproved) => {
  if (isApproved ) {
    let newPostText = contestedPosts.find(post_id === postID).contested_comment;
  }
}


*/

  const contestedPostModeration = async (satcatId, isApproved) => {
    try {
      await updateContestedPostApproval(satcatId, isApproved, userToken);
  
      const postToSave = contestedPosts.find((post) => post.SATCAT_id === satcatId);
      if (isApproved) {
        const updatedPostText = `${postToSave.post_text} ${postToSave.contested_comment}`;
        postToSave.post_text = updatedPostText
        postToSave.contested_comment = '';

        await fetch(`http://localhost:8080/post/${satcatId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            contested: false,
            post_text: postToSave.post_text,
            contested_comment: postToSave.contested_comment,
          }),
        })
      }

    //   await fetch(`http://localhost:8080/post/${satcatId}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${userToken}`,
    //   },
    //   body: JSON.stringify({ contested: false }),
    // });

      setContestedPosts((prevContestedPosts) =>
        prevContestedPosts.filter((post) => post.SATCAT_id !== satcatId)
      );
    } catch (error) {
      console.error('Error moderating contested post:', error);
    }
  };
  
  const updateContestedPostApproval = async (satcatId, isApproved, token) => {
    try {
      await fetch(`http://localhost:8080/post/${satcatId}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isApproved }),
      });
    } catch (error) {
      throw new Error('Error updating contested post approval status');
    }
  };

  return (
    <div>
      <h2>User Accounts:</h2>
      {userAccounts.map((user) => (
        <div key={user.DoD_id}>
          <p>User ID: {user.DoD_id}</p>
          <p>First Name: {user.firstname}</p>
          <p>Last Name: {user.lastname}</p>
          <p>User Status: {user.isBanned ? 'Banned' : 'Active'}</p>
          <button onClick={() => UserAccountBanToggle(user.DoD_id, user.isBanned)}>
            {user.isBanned ? 'Unban' : 'Ban'} User Account
          </button>
        </div>
      ))}

      <h2>Contested Posts:</h2>
      {contestedPosts
      .filter((post) => post.contested )
      .map((post) => (
        <div key={post.SATCAT_id}>
          <p>SATCAT ID: {post.SATCAT_id}</p>
          <p>Post Text: {post.post_text}</p>
          <p>Contested Comment: {post.contested_comment}</p>
          <p>Contested By: {post.contested_by}</p>
          <button onClick={() => contestedPostModeration(post.post_id, true)}>Approve</button>
          <button onClick={() => contestedPostModeration(post.post_id, false)}>Deny</button>
        </div>
      ))}
    </div>
  );
};

export default ModeratorPage;
