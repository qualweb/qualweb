import { expect } from 'chai';
import {recognizeUnitByLocale } from '../src/lib/units';

describe('Get currency info by locale', () => {
            it('Recognizing unit in English (en-US)', function () {
                this.timeout(50000);
                const input = "This house measures 20 square meters";
                const results = recognizeUnitByLocale("en-US", input);
                expect(results).to.be.true;
            });

            it('Recognizing unit in Portuguese (pt-PT)', function () {
                this.timeout(50000);
                const input = "Esta casa mede 20 metros quadrados";
                const results = recognizeUnitByLocale("pt-PT", input);
                expect(results).to.be.true;
            });
            it('Fail when receive a English unit in Portuguese locale', function () {
                this.timeout(50000);
                const input = "This house measures 20 square meters";
                const results = recognizeUnitByLocale("pt-PT", input);
                expect(results).to.be.false;
            });


            it('Should not recognize unit if not present (en-US)', function () {
                this.timeout(50000);
                const input = "This house is beautiful";
                const results = recognizeUnitByLocale("en-US", input);
                expect(results).to.be.false;
            });

            it('Should not recognize unit if not present (pt-PT)', function () {
                this.timeout(50000);
                const input = "Esta casa é bonita";
                const results = recognizeUnitByLocale("pt-PT", input);
                expect(results).to.be.false;
            });

            it('Should not recognize unit if not present (de-DE)', function () {
                this.timeout(50000);
                const input = "Dieses Haus ist schön";
                const results = recognizeUnitByLocale("de-DE", input);
                expect(results).to.be.false;
            });
        });

        

