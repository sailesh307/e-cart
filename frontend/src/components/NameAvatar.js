
const NameAvatar = ({ firstName, lastName }) => {
    const l1 = firstName.charAt(0).toUpperCase();
    const l2 = lastName?.charAt(0).toUpperCase() || '';
    return (
        <div className="h-10 w-10 flex items-center justify-center bg-gray-800 font-bold rounded-full">
            {l1} {l2}
        </div>
    )
}

export default NameAvatar