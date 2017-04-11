<template>
<span v-if="show">
    <slot>
    </slot>
</span>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    props: {
        permission: {
            type: Array,
            default: () => {
                return []
            }
        },
        allow: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            msg: "hello world"
        }
    },
    computed: {
        ...mapGetters({
            account: "loginAccount",
            loginPermission: "loginPermission"
        }),
        hasPermission() {
            var that = this
            if (!that.account) {
                return false
            }

            if (that.permission.length == 0) {
                return true
            }

            return that.loginPermission.some((o) => {
                return that.permission.some((p) => {
                    return p == o
                }) || (o == "admin")
            })
        },
        show() {
            return this.allow ? this.hasPermission : (!this.hasPermission)
        }
    }
}
</script>
