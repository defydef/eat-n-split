import { useState } from "react";

function App() {
  const initialFriends = [
    {
      id: 118836,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
    },
    {
      id: 933372,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
    },
    {
      id: 499476,
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
    },
  ];

  const [friends, setFriends] = useState(initialFriends);
  function handleAddNewFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
  }

  const [activeFriendId, setActiveFriendId] = useState(null);

  function handleActiveFriendId(id, activeFriendId) {
    if (id !== activeFriendId) {
      setActiveFriendId(id);
    } else {
      setActiveFriendId(null);
    }
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSetActiveFriendId={handleActiveFriendId}
          activeFriendId={activeFriendId}
        />
        <AddFriend
          onAddNewFriend={handleAddNewFriend}
          onHideSplitBill={() => setActiveFriendId(null)}
        />
      </div>
      <div>
        <FormSplitBill friends={friends} activeFriendId={activeFriendId} />
      </div>
    </div>
  );
}

function FriendList({ friends, onSetActiveFriendId, activeFriendId }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSetActiveFriendId={onSetActiveFriendId}
          activeFriendId={activeFriendId}
        />
      ))}{" "}
    </ul>
  );
}

function Friend({ friend, onSetActiveFriendId, activeFriendId }) {
  return (
    <li className={friend.id === activeFriendId ? "selected" : ""}>
      <img src={friend.image} alt="friend avatar" />
      <h3>{friend.name}</h3>
      {friend.balance < 0 ? (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      ) : friend.balance > 0 ? (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      ) : (
        <p>You and {friend.name} are even</p>
      )}
      <Button
        type="show-split-bill"
        onSetActiveFriendId={onSetActiveFriendId}
        friendId={friend.id}
        activeFriendId={activeFriendId}
      >
        {friend.id === activeFriendId ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function AddFriend({ onAddNewFriend, onHideSplitBill }) {
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  if (isAddingFriend) onHideSplitBill();
  return (
    <>
      <FormAddFriend
        isAddingFriend={isAddingFriend}
        onAddNewFriend={onAddNewFriend}
        onIsAddingFriend={() => setIsAddingFriend(false)}
      />
      <Button
        onIsAddingFriend={() =>
          setIsAddingFriend((isAddingFriend) => !isAddingFriend)
        }
        type="adding-friend"
      >
        {isAddingFriend ? "Close" : "Add friend"}
      </Button>
    </>
  );
}

function FormAddFriend({ isAddingFriend, onAddNewFriend, onIsAddingFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=100001");

  function addNewFriend(e) {
    e.preventDefault();
    const newFriend = {
      name: name,
      image: image,
      balance: 0,
      id: crypto.randomUUID(),
    };
    onAddNewFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48?u=100001");
    onIsAddingFriend();
  }

  if (isAddingFriend)
    return (
      <form className="form-add-friend" onSubmit={addNewFriend}>
        <label>👯Friend name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label>🌠Image URL</label>
        <input
          type="text"
          onChange={(e) => setImage((image) => e.target.value)}
          value={image}
        />

        <Button>Add</Button>
      </form>
    );
}

function FormSplitBill({ friends, activeFriendId }) {
  function activeFriend(friend) {
    return friend.id === activeFriendId;
  }

  const friend = friends.find(activeFriend);

  return (
    activeFriendId && (
      <form className="form-split-bill">
        <h2>Split a bill with {friend.name}</h2>
        <label>💰Bill value</label>
        <input type="text" />
        <label>💃Your expense</label>
        {friend.balance < 0 ? (
          <input type="text" />
        ) : (
          <input type="text" disabled />
        )}
        <label>👯{friend.name}'s expense</label>
        {friend.balance > 0 ? (
          <input type="text" value={Math.abs(friend.balance)} />
        ) : (
          <input type="text" disabled value={Math.abs(friend.balance)} />
        )}
        <label>🤑Who is paying the bill?</label>
        <select>
          <option value="you">You</option>
          <option value={friend}>{friend.name}</option>
        </select>
        <Button>Split bill</Button>
      </form>
    )
  );
}

function Button({
  children,
  onIsAddingFriend,
  type,
  onSetActiveFriendId,
  friendId,
  activeFriendId,
}) {
  function handleClick(type) {
    if (type === "adding-friend") onIsAddingFriend();
    else if (type === "show-split-bill") {
      onSetActiveFriendId(friendId, activeFriendId);
    }
  }
  return (
    <button className="button" onClick={() => handleClick(type)}>
      {children}
    </button>
  );
}

export default App;
