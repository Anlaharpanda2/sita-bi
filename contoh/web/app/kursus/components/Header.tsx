import Image from "next/image";

const Header = () => {
    return (
        <div className="bg-white px-10 py-4 flex items-center justify-between border-b border-zinc-200 fixed top-0 left-52 right-0 z-50 w-[calc(100%-13rem)]">                    
            <div className="flex items-center gap-2">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Cari..." 
                        className="w-48 px-4 py-1.5 text-xs rounded-2xl border border-black outline-none"
                    />
                </div>
                <button className="p-1.5 bg-slate-100 rounded-xl border border-slate-100">
                    <Image width={12} height={12} src="/kursus/Img-8.svg" alt="search" />
                </button>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 pr-6 border-r border-zinc-200">
                    <Image width={17} height={14} src="/kursus/Img-2.svg" alt="help" />
                    <span className="text-neutral-800/75 text-xs">Butuh Bantuan?</span>
                </div>
                <div className="relative">
                    <Image width={15} height={18} src="/kursus/Img-5.svg" alt="notification" />
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border border-white" />
                </div>
                <Image className="rounded-2xl" width={36} height={36} src="/kursus/Profile.png" alt="profile" />
            </div>
        </div>
    );
};

export default Header;
