import Link from "next/link"

export default function UnAuthorized() {
    return (
        <div className="w-full min-h-screen py-12 items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-3">
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">Unauthorized</h1>
                <p className="max-w-[600px] text-center text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                    You are not authorized to view this page. Please contact the website administrator to inform them of the
                    page's content.
                </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Link
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                    href="#"
                >
                    Go back to homepage
                </Link>
            </div>
        </div>
    )
}

