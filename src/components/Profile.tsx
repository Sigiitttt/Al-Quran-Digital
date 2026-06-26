// src/components/Profile.tsx

type ProfileProps = {
  greeting: string;
  name: string;
  avatar: string;
};

function Profile({ greeting, name, avatar }: ProfileProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-left text-xs text-text-secondary/50 font-medium tracking-wide">
          {greeting}
        </p>
        <p className="text-left text-base font-bold md:text-lg text-text-primary">
          {name}
        </p>
      </div>
      <div
        className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
        style={{
          border: "1px solid rgba(48, 54, 61, 0.4)",
        }}
      >
        <img
          src={avatar}
          alt="Profile User"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Profile;
