export default function AuthInput({ ...props }) {
    return (
        <input
            {...props}
            required
            className="
          w-100 px-2 py-2 rounded-lg
          bg-transparent text-white placeholder-white/70
          border border-white/50 outline-none
          focus:border-white focus:bg-white/25
          transition
        "
        />
    );
}
