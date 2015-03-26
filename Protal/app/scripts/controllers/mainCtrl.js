(function () {
    /*
    *
    *特别说明：
    *    词性标注是按照已有页面匹配，数据不全，如有不准，仅供参考。
    *    tag的颜色根据原demo页面已有的值匹配， 数据不全，如有不对，仅供参考。
    *
    */

    'use strict';

    angular
        .module('app')
        .controller('mainController', mainController);

    //Inject modules
    mainController.$inject = ['analysisService', 'logger', 'DEBUG'];

    function mainController(analysisService, logger, DEBUG) {
        var vm = this;
        vm.text = '15日，备受关注的电影《黄金时代》在北京举行了电影发布会，导演许鞍华和编剧李樯及汤唯、冯绍峰等众星悉数亮相。据悉，电影确定将于10月1日公映。本片讲述了“民国四大才女”之一的萧红短暂而传奇的一生，通过她与萧军、汪恩甲、端木蕻良、洛宾基四人的情感纠葛，与鲁迅、丁玲等人一起再现上世纪30年代的独特风貌。电影原名《穿过爱情的漫长旅程》，后更名《黄金时代》，这源自萧红写给萧军信中的一句话：“这不正是我的黄金时代吗？”';
        vm.isLoading = true;

        vm.identifyTagName = identifyTagName;
        vm.tagClass = tagClass;
        vm.requestAnalysis = requestAnalysis;

        activate();

        function activate() {
            requestAnalysis();
        }

        function requestAnalysis() {
            if (vm.text == "" && vm.text != undefined) {
                logger.logError('输入文本为空!');
            } else {
                //Use angular $http
                analysisService.requestAnalysis(vm.text)
                    .then(function (data) {
                        if (DEBUG) {
                            logger.logInfo('成功，词性分析成功!');
                        }

                        vm.data = data;
                        vm.isLoading = false;
                    })
                    .catch(function (e) {
                        vm.isLoading = false;
                        logger.logError('请求分析出错!');
                    });

                //Use ajax post
                //analysisService.requestAnalysisUseAjax(vm.text, function (err, data) {
                //    vm.isLoading = false;

                //    if (err) {
                //        logger.logError(err);
                //    } else {
                //        if (DEBUG) {
                //            logger.logInfo('成功，词性分析成功!');
                //        }

                //        vm.data = data;
                //    }
                //});
            }

            //Mock service
            //vm.data = analysisService.mockRequestAnalysis();
            //vm.isLoading = false;
        }

        //词性标注是按照已有页面匹配，数据不全，如有不准，仅供参考。
        function identifyTagName(tag) {
            //未识别则用tag
            var name = tag;

            switch (tag) {
                case 'NT':
                    name = '时间词';
                    break;
                case 'PU':
                    name = '标点符号';
                    break;
                case 'VV':
                    name = '动词';
                    break;
                case 'VC':
                    name = '动词';
                    break;
                case 'DEC':
                    name = '助词';
                    break;
                case 'AS':
                    name = '助词';
                    break;
                case 'ETC':
                    name = '助词';
                    break;
                case 'DEG':
                    name = '助词';
                    break;
                case 'NN':
                    name = '名词';
                    break;
                case 'NR':
                    name = '名词';
                    break;
                case 'P':
                    name = '介词';
                    break;
                case 'CC':
                    name = '连词';
                    break;
                case 'AD':
                    name = '副词';
                    break;
                case 'DT':
                    name = '副词';
                    break;
                case 'CD':
                    name = '数词';
                    break;
                case 'JJ':
                    name = '形容词';
                    break;
                case 'VA':
                    name = '形容词';
                    break;
                case 'PN':
                    name = '代词';
                    break;
                case 'LC':
                    name = '中';
                    break;
                case 'M':
                    name = '量词';
                    break;
                case 'SP':
                    name = '语气词';
                    break;
            }

            return name;
        }

        //tag的颜色根据原demo页面已有的值匹配， 数据不全，如有不对，仅供参考。
        function tagClass(tag) {
            var classObj = {
                'a':
                    tag == 'JJ' || tag == 'VA',
                'w':
                    tag == 'PU',
                't':
                    tag == 'NT',
                'v':
                    tag == 'VV' || tag == 'VC',
                'u':
                    tag == 'DEC' || tag == 'AS' || tag == 'ETC' || tag == 'DEG',
                'p':
                    tag == 'P',
                'n':
                    tag == 'NR' || tag == 'NN',
                'c':
                    tag == 'CC',
                'd':
                    tag == 'AD' || tag == 'DT',
                'y':
                    tag == 'SP',
                'r':
                    tag == 'PN',
                'q':
                    tag == 'M',
                'm':
                    tag == 'CD',
                'f':
                    tag == 'LC'
            };

            return classObj;
        }
    }
})();