export default function coiCalculator() {
    return {
        coi: "0.00%",
        setWarning(ref) {
            if (!ref.classList.contains('coi-warn')) {
                ref.classList.add('coi-warn');
            }
        },
        resetWarnings(refs) {
            refs.forEach(ref => {
                if (ref.classList.contains('coi-warn')) {
                    ref.classList.remove('coi-warn');
                }
            });
        },
        processFromClipboard(index) {
            navigator.clipboard.readText()
                .then(text => {
                    switch(index) {
                        case 1:
                            this.$refs.gp_a1.value = this.parseID(text, /\Wsire\s*:+.* (\d*)/i);
                            this.$refs.gp_a2.value = this.parseID(text, /\Wdam\s*:+.* (\d*)/i);
                            this.$refs.ggp_a1.value = this.parseID(text, /\Wss\s*:+.* (\d*)/i);
                            this.$refs.ggp_a2.value = this.parseID(text, /\Wsd\s*:+.* (\d*)/i);
                            this.$refs.ggp_a3.value = this.parseID(text, /\Wds\s*:+.* (\d*)/i);
                            this.$refs.ggp_a4.value = this.parseID(text, /\Wdd\s*:+.* (\d*)/i);
                            break;
                        case 2:
                            this.$refs.gp_b1.value = this.parseID(text, /\Wsire\s*:+.* (\d*)/i);
                            this.$refs.gp_b2.value = this.parseID(text, /\Wdam\s*:+.* (\d*)/i);
                            this.$refs.ggp_b1.value = this.parseID(text, /\Wss\s*:+.* (\d*)/i);
                            this.$refs.ggp_b2.value = this.parseID(text, /\Wsd\s*:+.* (\d*)/i);
                            this.$refs.ggp_b3.value = this.parseID(text, /\Wds\s*:+.* (\d*)/i);
                            this.$refs.ggp_b4.value = this.parseID(text, /\Wdd\s*:+.* (\d*)/i);
                            break;
                    }
                    this.calculate();
                })
                .catch(err => {
                    console.error('Failed to read clipboard text:', err);
                });
        },
        parseID(text, pattern) {
            const match = text.match(pattern);
            if (match) {
                return match[1];
            }
            else {
                return null;
            }
        },
        calculate() {
            let generations = this.getGenerations();
            let totalCOI = this.calculateTotalCOI(generations);
            this.coi = (totalCOI * 100).toFixed(2) + "%";
        },
        calculateTotalCOI(generations) {
            let totalCOI = 0;
            generations.forEach(g => {
                const coiContribution = this.calculateAncestorCOI(g);
                totalCOI += coiContribution;
            });
            return totalCOI;
        },
        calculateAncestorCOI(generation) {
            return Math.pow(0.5, generation);
        },
        getGenerations() {
            let ancestors = this.getAncestors();
            let g1 = this.getG1();
            let g2 = this.getG2();
            let g3 = this.getG3();
            this.resetWarnings(ancestors);

            let uniqueAncestors = [...new Set(ancestors.filter(x => x.value != null && x.value != '').map(x => x.value))];
            let generations = [];

            uniqueAncestors.forEach(ancestor => {
                if (ancestors.filter(x => x.value == ancestor).length > 1) {
                    let _generations = [];
                    g1.forEach(g => {
                        if (g.value == ancestor) {
                            _generations.push(1);
                            this.setWarning(g);
                        }
                    });
                    g2.forEach(g => {
                        if (g.value == ancestor) {
                            _generations.push(2);
                            this.setWarning(g);
                        }
                    });
                    g3.forEach(g => {
                        if (g.value == ancestor) {
                            _generations.push(3);
                            this.setWarning(g);
                        }
                    });
                    _generations.shift();
                    generations.push(..._generations);
                }
            });

            return generations;
        },
        getAncestors() {
            let ancestors = [
                this.$refs.p_a,
                this.$refs.gp_a1,
                this.$refs.gp_a2,
                this.$refs.ggp_a1,
                this.$refs.ggp_a2,
                this.$refs.ggp_a3,
                this.$refs.ggp_a4,
                this.$refs.p_b,
                this.$refs.gp_b1,
                this.$refs.gp_b2,
                this.$refs.ggp_b1,
                this.$refs.ggp_b2,
                this.$refs.ggp_b3,
                this.$refs.ggp_b4
            ];
            return ancestors;
        },
        getG1() {
            let ancestors = [
                this.$refs.p_a,
                this.$refs.p_b
            ];
            return ancestors;
        },
        getG2() {
            let ancestors = [
                this.$refs.gp_a1,
                this.$refs.gp_a2,
                this.$refs.gp_b1,
                this.$refs.gp_b2
            ];
            return ancestors;
        },
        getG3() {
            let ancestors = [
                this.$refs.ggp_a1,
                this.$refs.ggp_a2,
                this.$refs.ggp_a3,
                this.$refs.ggp_a4,
                this.$refs.ggp_b1,
                this.$refs.ggp_b2,
                this.$refs.ggp_b3,
                this.$refs.ggp_b4
            ];
            return ancestors;
        }
    }
}
