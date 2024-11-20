<script lang="ts" setup>
import {z} from 'zod';

// jellyfin APIキー
const apiKey: string = '';
// jellyfinサーバー URL
const baseUrl: string = '';
// jellyfinのフォルダ名
const folderName: string = '';

// zod schema
const uuidSchema = z.string().uuid();
type UuidSchemaType = z.infer<typeof uuidSchema>;
const librarySchema = z.object({
    Name: z.string(),
    Id: z.string()
});
type LibrarySchemaType = z.infer<typeof librarySchema>;

// uuidをハイフンつきで生成
function convertUUID(uuid: string): string {
    if (uuid.length !== 32) {
        throw new Error('Invalid UUID string. Must be 32 characters long.');
    }
    return `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}-${uuid.slice(12, 16)}-${uuid.slice(16, 20)}-${uuid.slice(20)}`;
}

const asyncJellyfinUser = useFetch(
    `${baseUrl}/Users`,
    {
        method: 'GET',
        params: {
            api_key: apiKey
        },
        transform: (data) => {
            const arrayData = data[0];
            return arrayData.Name;
        },
        onRequestError({request, error}) {
            console.error('Error', error);
            return 'Error';
        },
        onResponseError({response, error}) {
            console.error('Error', error);
            return 'Error';
        }
    }
);

const asyncJellyfinLibrary = await useFetch(
    `${baseUrl}/Library/MediaFolders`,
    {
        method: 'GET',
        params: {
            api_key: apiKey
        },
        transform: (data) => {
            const arrayData = data.Items;
            const libraryName: [LibrarySchemaType] = arrayData.map((item: any) => {
                return {
                    Name: item.Name,
                    Id: item.Id
                }
            });
            return libraryName;
        },
        onRequestError({request, error}) {
            console.error('Error', error);
            return 'Error';
        },
        onResponseError({response, error}) {
            console.error('Error', error);
            return 'Error';
        },
        // onResponse({response}) {
        //     //console.log('Success', response);
        // }
    }
);

async function asyncJellyfinSearchName(item: { Name: string, Id: UuidSchemaType }): Promise<any> {
    const {data, error} = await useLazyFetch(
        `${baseUrl}/Items`,
        {
            method: 'GET',
            params: {
                api_key: apiKey,
                parentId: item.Id
            },
            transform: (data) => {
                const arrayData = data.Items;
                const videoData = arrayData.map((item: any) => {
                    return {
                        Name: item.Name,
                        Id: item.Id
                    }
                });
                return videoData;
            },
            onRequestError({request, error}) {
                console.error('Request Error', error);
                return 'Error';
            },
            onResponseError({response, error}) {
                console.error('Response Error', error);
                return 'Error';
            },
            // onResponse({response}) {
            //
            // }
        }
    );
    if (error.value) {
        console.error('Error :', error.value);
        return null;
    }
    return data.value || null;
}

function asyncJellyfinThumbnailUrl(uuid: UuidSchemaType): string {
    const url = `${baseUrl}/Items/${uuid}/Images/Primary`;
    const params = {
        api_key: apiKey
    };
    const queryParam = new URLSearchParams(params);
    const urlFull = `${url}?${queryParam}`;
    return urlFull;
}

const usersLibraryUUID = asyncJellyfinLibrary.data.value.find((item: LibrarySchemaType) => item.Name === folderName)?.Id;
const usersLibraryUUIDWithHyphen = convertUUID(usersLibraryUUID);

const asyncVideoData = await asyncJellyfinSearchName({
    Name: folderName,
    Id: usersLibraryUUIDWithHyphen
});
const pending = asyncVideoData.pending;
const usersVideoData: [] = asyncVideoData;
const asyncVideoDataArray: LibrarySchemaType[] = usersVideoData.slice(0, 10);

</script>
<template>
    <main class="">
        <p class="bg-yellow-300 text-xl">UserName :{{ asyncJellyfinUser.data }}</p>
        <div class="px-10">
            <div v-if="pending">
                読み込み中
            </div>
            <div v-else>
                <div v-for="item in asyncVideoDataArray" :key="item.Name">
                    <div class="min-w-2xl max-w-3xl flex justify-content-center bg-slate-100 mt-4 py-2 ">
                        <div class="w-1/2">
                            <img :src="asyncJellyfinThumbnailUrl(convertUUID(item.Id))"
                                 class="border-black border">
                        </div>
                        <div class="w-1/2">
                            <p class="pl-5 text-2xl">タイトル:
                                {{ item.Name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped>

</style>
