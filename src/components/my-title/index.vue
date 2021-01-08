<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" v-bind="$attrs" v-on="$listeners">
      <template #left>
        <slot name="left" v-if="isShowIcon">
          <img src="./images/header_arrow_org.svg" alt="" class="title-left" />
        </slot>
      </template>

      <template #title>
        <slot name="title" />
      </template>
      <template #right v-if="!$attrs['right-text']">
        <slot name="right">
          <van-dropdown-menu class="f_tr_menu" v-if="muti">
            <van-dropdown-item ref="titleRightMenuRef">
              <van-icon
                name="ellipsis"
                slot="title"
                style="font-size: 24px;margin-top: 3px;"
              />
              <van-cell
                center
                :title="item.name"
                v-for="(item, index) in rightMenus"
                :key="index"
                @click="menuClick(item)"
              />
            </van-dropdown-item>
          </van-dropdown-menu>

          <van-icon
            v-else-if="close"
            name="close"
            size="18"
            @click="closeWeb"
          />
        </slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'MyTitle',
  props: {
    close: {
      type: Boolean,
      default: false,
    },
    isShowIcon: {
      type: Boolean,
      default: true,
    },
    leftClick: {
      type: Boolean,
      default: false,
    },
    muti: {
      type: Boolean,
      default: false,
    },
    rightMenus: {
      type: Array,
      default: null,
    },
  },
  methods: {
    onClickLeft() {
      this.$emit('leftClick')
      if (!this.leftClick) {
        if (this.close) {
        } else {
          this.$router.go(-1)
        }
      }
    },
    closeWeb() {},
    menuClick(item) {
      this.$refs.titleRightMenuRef.toggle()
      this.$emit('menuClick', item)
    },
  },
}
</script>

<style scoped>
.van-nav-bar >>> .van-icon {
  color: #ff7e46;
}

>>> .van-nav-bar__left {
  padding: 0;
}

.title-left {
  width: 42px;
  height: 42px;
  left: 0;
}

>>> .van-nav-bar__text {
  color: #ff7e46;
}

.f_tr_menu >>> .van-dropdown-menu__bar {
  height: 46px;
  box-shadow: inherit;
}

.f_tr_menu >>> .van-dropdown-menu__title::after {
  display: none;
}
.f_tr_menu >>> .van-popup {
  width: 30%;
  right: 0;
  left: auto;
  /* border-radius: 4px; */
}

.f_tr_menu >>> .van-overlay {
  background-color: rgb(0 0 0 / 20%) !important;
  z-index: 10000;
}

.f_tr_menu >>> .van-dropdown-menu__title {
  padding: 0;
}
</style>
