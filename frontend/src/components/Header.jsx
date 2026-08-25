function Header() {
    return (
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-5">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                    Smart Agriculture
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Rover Monitoring System
                </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <span>Connected</span>
            </div>
        </header>
    );
}

export default Header;