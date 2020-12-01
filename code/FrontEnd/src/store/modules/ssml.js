import defaultSSML from '../../components/lib/contruct'
const state = {
    listSSML:[],
    currentID:0,
    choosenSSML:{},
    choosenTag:""
  };
  
  const mutations = {
    CHANGE_OPTION: (state, { key, value }) => {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        state[key] = value;
      }
    },
    PUSH_LIST_SSML: (state, value ) => {
          state.listSSML.push(value);
    },
  };
  
  const actions = {
    changeOption({ commit }, data) {
      commit('CHANGE_OPTION', data);
    },
    pushSSML({ commit }, data) {
        commit('PUSH_LIST_SSML', data);
      },
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
  };