<script lang="ts" setup>
const show = ref(false);
const toggle = () => {
    show.value = !show.value;
};
</script>
<template>
    <header class="h-20 bg-sky-100 font-gfont">
        <div class="flex items-center h-full text-md pl-5 pt-3">
            <div class="flex text-blue-900 ">
                <NuxtLink to="/">
                    <p class="text-blue-900 bg-white pr-5 mr-5 pl-5">ホーム</p>
                </NuxtLink>
                <NuxtLink to="/">
                    <p class="bg-white pr-5 mr-5 pl-5">詳細</p>
                </NuxtLink>
            </div>
        </div>
    </header>
    <NuxtLayout>
        <NuxtLoadingIndicator/>
        <NuxtPage/>
    </NuxtLayout>
    <footer class="">
    </footer>
</template>

