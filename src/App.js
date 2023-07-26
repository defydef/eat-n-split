import logo from "./logo.svg";

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
  return (
    <div className="app">
      <div className="sidebar">
        <ul>
          {initialFriends.map((friend) => (
            <li>
              <h3>{friend.name}</h3>
              <p>
                You owe {friend.name} ${friend.balance}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FriendList() {}

function Friend({ friend }) {}

export default App;
