import Image from "next/image";

const Sidebar = () => {
    return (
        <div className="w-52 border-r border-zinc-200 flex-shrink-0">
            <div className="p-4 fixed">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-10">
                    <Image width={26} height={26} src="/logo.png" alt="logo" />
                    <div className="text-sm">
                        <span className="text-black font-normal">Voca</span>
                        <span className="text-neutral-600 font-normal">Link</span>
                    </div>
                </div>

                {/* Menu */}
                <div className="space-y-1">
                    <div className="text-neutral-800/75 text-xs font-bold uppercase mb-4">Menu Utama</div>
                    
                    <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
                        <Image width={16} height={11} src="/kursus/Img-12.svg" alt="" />
                        <span className="text-neutral-800/75 text-xs">Dashboard</span>
                    </div>

                    <div className="flex items-center gap-3 px-3 py-2 rounded bg-blue-500 cursor-pointer">
                        <Image width={13} height={13} src="/kursus/Img.svg" alt="" />
                        <span className="text-white text-xs">Kelas Saya</span>
                    </div>

                    <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
                        <Image width={11} height={13} src="/kursus/Img-6.svg" alt="" />
                        <span className="text-neutral-800/75 text-xs">Daftar Kelas</span>
                    </div>

                    <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
                        <Image width={16} height={13} src="/kursus/Img-3.svg" alt="" />
                        <span className="text-neutral-800/75 text-xs">Pertanyaan</span>
                    </div>

                    <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
                        <Image width={15} height={13} src="/kursus/Img-1.svg" alt="" />
                        <span className="text-neutral-800/75 text-xs">Leaderboard</span>
                    </div>

                    <div className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <Image width={13} height={12} src="/kursus/Img-16.svg" alt="" />
                            <span className="text-neutral-800/75 text-xs">For You</span>
                        </div>
                        <Image width={11} height={6} src="/kursus/Img-13.svg" alt="" />
                    </div>

                    <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
                        <Image width={14} height={14} src="/kursus/Img-7.svg" alt="" />
                        <span className="text-neutral-800/75 text-xs">For Mentor</span>
                    </div>
                </div>

                {/* Bottom Buttons */}
                <div className="mt-auto space-y-3 pt-40">
                    <button className="w-full py-2 px-4 rounded border border-gray-500 flex items-center justify-center gap-2 hover:bg-gray-100">
                        <Image width={11} height={11} src="/kursus/Img-4.svg" alt="" />
                        <span className="text-gray-500 text-xs">Gabung Komunitas</span>
                    </button>
                    <button className="w-full py-2 px-4 rounded border border-gray-500 flex items-center justify-center gap-2 hover:bg-gray-100">
                        <Image width={10} height={11} src="/kursus/Img-15.svg" alt="" />
                        <span className="text-gray-500 text-xs">Tanya Mentor</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
