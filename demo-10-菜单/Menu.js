Vue.component('vLink', {
    render(h) {
        return h('li', [
            h('a', [
                h('i', {
                    attrs: {
                        class: this.link.icon
                    },
                }),
                h('span', this.link.name)
            ])
        ]);
    },
    props: {
        link: {
            type: Object,
            default: {}
        }
    }
});

Vue.component('vLinkGroup', {
    render(h) {
        let list = [];
        this.link.children.forEach((e) => {
            if (e.children) {
                list.push(h('vLinkGroup', {
                    props: {
                        link: e
                    }
                }));
            } else {
                list.push(h('vLink', {
                    props: {
                        link: e
                    }
                }));
            }
        });

        return h('li', [
            h('a', {
                on: {
                    click: this.clickHandler
                }
            }, [
                h('i', {
                    attrs: {
                        class: this.link.icon
                    },
                }),
                h('span', this.link.name)
            ]),
            h('ul', {
                'class': {
                    hidden: this.hidden
                }
            }, list)
        ]);
    },
    props: {
        link: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            hidden: true,
            index: this.no
        }
    },
    methods: {
        clickHandler() {
            this.hidden = !this.hidden;

            let nbs = this.getNbs(0);
            nbs.forEach(e => {
                if (this.link.name !== e.link.name){
                    e.hidden = true;
                }
            });
        },
        getNbs() {
            return this.$parent.$children.filter(function (item) {
                return item.$options.name === 'vLinkGroup'
            });
        }
    }
});


Vue.component('vMenu', {
    render(h) {
        let li = [];
        this.list.forEach((e) => {
            if (e.children) {
                li.push(h('vLinkGroup', {
                    props: {
                        link: e
                    }
                }));
            } else {
                li.push(h('vLink', {
                    props: {
                        link: e
                    }
                }));
            }
        });
        return h('ul', li);
    },
    props: {
        menus: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            list: this.menus
        }
    }
});