<template>
    <div class="flex flex-col flex-1 w-full h-fit p-4 gap-4 border border-neutral-700">
        <div class="flex items-center justify-center gap-3 w-full p-3 border-b border-neutral-700">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M240-80q-50 0-85-35t-35-85v-560q0-50 35-85t85-35h440v640H240q-17 0-28.5 11.5T200-200q0 17 11.5 28.5T240-160h520v-640h80v720H240Zm120-240h240v-480H360v480Zm-80 0v-480h-40q-17 0-28.5 11.5T200-760v447q10-3 19.5-5t20.5-2h40Zm-80-480v487-487Z"/></svg>
            <h1 class="font-semibold text-md">My LogBooks</h1>
        </div>
        <ul>
            <li class="flex flex-col items-center gap-3">
                <button class="cursor-pointer w-full p-2 bg-transparent transition-all duration-150 hover:bg-neutral-800">
                    <span>My first America tour</span>
                </button>
                <button class="cursor-pointer w-full p-2 bg-transparent transition-all duration-150 hover:bg-neutral-800">
                    <span>Asian travels</span>
                </button>
            </li>
        </ul>
        <div class="flex gap-3 pt-4 items-center justify-center w-full border-t border-neutral-700">
            <button class="cursor-pointer flex gap-3 items-center justify-center w-full p-2 bg-transparent transition-all duration-150 hover:bg-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                <p>Add new LogBook</p>
            </button>
        </div>
    </div>
</template>