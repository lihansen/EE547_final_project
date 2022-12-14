<template>
  <div class="recommend">
    <router-view :dataList="videos"></router-view>
  </div>
</template>

<script>
import { watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
// import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import gql from 'graphql-tag';

// const cache = new InMemoryCache();

// const apolloClient = new ApolloClient({
//   uri: '<https://rickandmortyapi.com/graphql>',
//   cache,
// });

// provideApolloClient(apolloClient);

const CHARACTERS_QUERY = gql`
query videos {
  FindAllVideos {
    _id,
    title,
    author,
    link,
    likes,
    comments {
      body,
      author
    }
    tags
  }
}
`;

export default {
  name: 'Recommend',
  async setup() {
    const { loading, error, result } = useQuery(CHARACTERS_QUERY);
    console.log(loading);
    console.log('error', await (error));
    console.log(await (result.value));
    watch(() => {
      console.log(result.value);
    });
    return {
      result,
      loading,
      error,
    };
  },

  data() {
    // const { result, loading, error } = useQuery(VIDEOS_QUERY);
    // console.log(result.FindAllVideos);

    return {
      videos: 'result',
      // loading,
      // error,
    };
  },
  mounted() {
    this.$router.push({ path: 'reVidelList' }).catch(() => { });
  },
};
</script>

<style lang="less" scoped>

</style>
