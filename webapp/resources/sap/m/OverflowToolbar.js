/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/m/ToggleButton','sap/ui/core/InvisibleText','sap/m/Toolbar','sap/m/ToolbarSpacer','sap/m/OverflowToolbarLayoutData','sap/m/OverflowToolbarAssociativePopover','sap/m/OverflowToolbarAssociativePopoverControls','sap/m/OverflowToolbarPriority','sap/ui/core/IconPool','sap/m/SearchField'],function(q,l,T,I,a,b,O,c,d,e,f,S){"use strict";var g=a.extend("sap.m.OverflowToolbar",{metadata:{aggregations:{_overflowButton:{type:"sap.m.ToggleButton",multiple:false,visibility:"hidden"},_popover:{type:"sap.m.Popover",multiple:false,visibility:"hidden"}}}});g.prototype._callToolbarMethod=function(F,A){return a.prototype[F].apply(this,A);};g.prototype.init=function(){this._callToolbarMethod("init",arguments);this._iPreviousToolbarWidth=null;this._bOverflowButtonNeeded=false;this._bListenForControlPropertyChanges=false;this._bControlsInfoCached=false;this._bSkipOptimization=false;if(!g._sAriaOverflowButtonLabelId){var C=sap.ui.getCore().getLibraryResourceBundle("sap.ui.core");g._sAriaOverflowButtonLabelId=new I({text:C.getText("Icon.overflow")}).toStatic().getId();}};g.prototype.onAfterRendering=function(){if(this._bControlWasFocused){this._getOverflowButton().focus();this._bControlWasFocused=false;}if(this._bOverflowButtonWasFocused&&!this._getOverflowButtonNeeded()){this.$().lastFocusableDomRef().focus();this._bOverflowButtonWasFocused=false;}this._getOverflowButton().$().attr("aria-haspopup","true");this._doLayout();};g.prototype._doLayout=function(){var w=this.$().width();this._bListenForControlPropertyChanges=false;this._deregisterToolbarResize();this._polyfillFlexboxSupport();if(w>0){if(!this._bControlsInfoCached){this._cacheControlsInfo();}if(this._iPreviousToolbarWidth!==w){this._iPreviousToolbarWidth=w;this._setControlsOverflowAndShrinking(w);}}this._registerToolbarResize();this._bListenForControlPropertyChanges=true;};g.prototype._polyfillFlexboxSupport=function(){if(a.hasNewFlexBoxSupport){return;}if(a.hasFlexBoxSupport){var t=this.$();var D=t[0]||{};t.removeClass("sapMTBOverflow");var o=D.scrollWidth>D.clientWidth;o&&t.addClass("sapMTBOverflow");}else{a.flexie(this.$());}};g.prototype._cacheControlsInfo=function(){var p,C,A;this._aMovableControls=[];this._aToolbarOnlyControls=[];this._aActionSheetOnlyControls=[];this._aControlSizes={};this._iContentSize=0;this.getContent().forEach(function(o){p=g._getControlPriority(o);C=p!==e.NeverOverflow;A=p===e.AlwaysOverflow;var i=g._getOptimalControlWidth(o);this._aControlSizes[o.getId()]=i;if(d.supportsControl(o)&&A){this._aActionSheetOnlyControls.push(o);}else{this._iContentSize+=i;if(d.supportsControl(o)&&C){this._aMovableControls.push(o);}else{this._aToolbarOnlyControls.push(o);}}},this);if(sap.ui.Device.system.phone){this._iContentSize-=1;}this._bControlsInfoCached=true;};g.prototype._setControlsOverflowAndShrinking=function(t){var C=this._iContentSize,B=[],s,i,A,F=function(o){o.forEach(function(p){this._moveButtonToActionSheet(p);},this);},h=function(H){if(typeof H==="undefined"||this._getPopover()._getContentIdsHash()!==H){this.invalidate();if(this._getControlsIds().indexOf(sap.ui.getCore().getCurrentFocusedControlId())!==-1){this._bControlWasFocused=true;}if(sap.ui.getCore().getCurrentFocusedControlId()===this._getOverflowButton().getId()){this._bOverflowButtonWasFocused=true;}}},j=function(C){if(!this._getOverflowButtonNeeded()){C+=this._getOverflowButtonSize();this._setOverflowButtonNeeded(true);}return C;},k=function(M){var G={},o=[];M.forEach(function(p){var r=g._getControlGroup(p),P=g._oPriorityOrder,u,v,w;if(r){u=g._getControlPriority(p);v=g._getControlIndex(p);G[r]=G[r]||[];w=G[r];w.push(p);if(!w._priority||P[w._priority]<P[u]){w._priority=u;}if(!w._index||w._index<v){w._index=v;}}else{o.push(p);}});Object.keys(G).forEach(function(p){o.push(G[p]);});return o;},E=function(M){if(M.length){M.forEach(n,this);}else{n.call(this,M);}if(C<=t){return true;}},m=function(v,o){var p=g._oPriorityOrder,r=g._getControlPriority(v),u=g._getControlPriority(o),P=p[r]-p[u];if(P!==0){return P;}else{return g._getControlIndex(o)-g._getControlIndex(v);}},n=function(o){B.unshift(o);C-=this._aControlSizes[o.getId()];};if(this._bSkipOptimization){this._bSkipOptimization=false;}else{s=this._getPopover()._getContentIdsHash();}this._resetToolbar();if(this._aActionSheetOnlyControls.length){for(i=this._aActionSheetOnlyControls.length-1;i>=0;i--){B.unshift(this._aActionSheetOnlyControls[i]);}C=j.call(this,C);}if(C<=t){F.call(this,B);h.call(this,s);return;}if(this._aMovableControls.length){C=j.call(this,C);A=k(this._aMovableControls);A.sort(m);A.some(E,this);}F.call(this,B);if(C>t){this._checkContents();}h.call(this,s);};g.prototype._resetToolbar=function(){this._getPopover().close();this._getPopover()._getAllContent().forEach(function(B){this._restoreButtonInToolbar(B);},this);this._setOverflowButtonNeeded(false);this.getContent().forEach(function(C){C.removeStyleClass(a.shrinkClass);});};g.prototype._moveButtonToActionSheet=function(B){this._getPopover().addAssociatedContent(B);};g.prototype._restoreButtonInToolbar=function(B){if(typeof B==="object"){B=B.getId();}this._getPopover().removeAssociatedContent(B);};g.prototype._resetAndInvalidateToolbar=function(h){this._resetToolbar();this._bControlsInfoCached=false;this._iPreviousToolbarWidth=null;if(h){this._bSkipOptimization=true;}this.invalidate();};g.prototype._getVisibleContent=function(){var t=this.getContent(),A=this._getPopover()._getAllContent();return t.filter(function(C){return A.indexOf(C)===-1;});};g.prototype._getOverflowButton=function(){var o;if(!this.getAggregation("_overflowButton")){o=new T({icon:f.getIconURI("overflow"),press:this._overflowButtonPressed.bind(this),ariaLabelledBy:this._sAriaOverflowButtonLabelId,type:sap.m.ButtonType.Transparent});this.setAggregation("_overflowButton",o,true);}return this.getAggregation("_overflowButton");};g.prototype._overflowButtonPressed=function(E){var p=this._getPopover(),B=this._getBestActionSheetPlacement();if(p.getPlacement()!==B){p.setPlacement(B);}if(p.isOpen()){p.close();}else{p.openBy(E.getSource());}};g.prototype._getPopover=function(){var p;if(!this.getAggregation("_popover")){p=new c(this.getId()+"-popover",{showHeader:false,showArrow:sap.ui.Device.system.phone?false:true,modal:false,horizontalScrolling:sap.ui.Device.system.phone?false:true,contentWidth:sap.ui.Device.system.phone?"100%":"auto"});if(sap.ui.Device.system.phone){p.attachBeforeOpen(this._shiftPopupShadow,this);p.attachAfterOpen(this._shiftPopupShadow,this);}p.attachAfterClose(this._popOverClosedHandler,this);this.setAggregation("_popover",p,true);}return this.getAggregation("_popover");};g.prototype._shiftPopupShadow=function(){var p=this._getPopover(),P=p.getCurrentPosition();if(P===sap.m.PlacementType.Bottom){p.addStyleClass("sapMOTAPopoverNoShadowTop");p.removeStyleClass("sapMOTAPopoverNoShadowBottom");}else if(P===sap.m.PlacementType.Top){p.addStyleClass("sapMOTAPopoverNoShadowBottom");p.removeStyleClass("sapMOTAPopoverNoShadowTop");}};g.prototype._popOverClosedHandler=function(){this._getOverflowButton().setPressed(false);this._getOverflowButton().$().focus();this._getOverflowButton().setEnabled(false);q.sap.delayedCall(0,this,function(){this._getOverflowButton().setEnabled(true);q.sap.delayedCall(0,this,function(){this._getOverflowButton().$().focus();});});};g.prototype._getOverflowButtonNeeded=function(){return this._bOverflowButtonNeeded;};g.prototype._setOverflowButtonNeeded=function(v){if(this._bOverflowButtonNeeded!==v){this._bOverflowButtonNeeded=v;}return this;};g.prototype.onLayoutDataChange=function(){this._resetAndInvalidateToolbar(true);};g.prototype.addContent=function(C){this._registerControlListener(C);this._preProcessControl(C);this._resetAndInvalidateToolbar(false);return this._callToolbarMethod("addContent",arguments);};g.prototype.insertContent=function(C,i){this._registerControlListener(C);this._preProcessControl(C);this._resetAndInvalidateToolbar(false);return this._callToolbarMethod("insertContent",arguments);};g.prototype.removeContent=function(C){var v=this._callToolbarMethod("removeContent",arguments);this._resetAndInvalidateToolbar(false);this._postProcessControl(v);this._deregisterControlListener(v);return v;};g.prototype.removeAllContent=function(){var C=this._callToolbarMethod("removeAllContent",arguments);C.forEach(function(o){this._deregisterControlListener(o);this._postProcessControl(o);},this);this._resetAndInvalidateToolbar(false);return C;};g.prototype.destroyContent=function(){this._resetAndInvalidateToolbar(false);q.sap.delayedCall(0,this,function(){this._resetAndInvalidateToolbar(false);});return this._callToolbarMethod("destroyContent",arguments);};g.prototype._registerControlListener=function(C){if(C){C.attachEvent("_change",this._onContentPropertyChangedOverflowToolbar,this);}};g.prototype._deregisterControlListener=function(C){if(C){C.detachEvent("_change",this._onContentPropertyChangedOverflowToolbar,this);}};g.prototype._onContentPropertyChangedOverflowToolbar=function(E){if(!this._bListenForControlPropertyChanges){return;}var s=E.getSource().getMetadata().getName();var C=d.getControlConfig(s);var p=E.getParameter("name");if(typeof C!=="undefined"&&C.noInvalidationProps.indexOf(p)!==-1){return;}this._resetAndInvalidateToolbar(true);};g.prototype._getOverflowButtonSize=function(){var B=parseInt(sap.m.BaseFontSize,10),C=this.$().parents().hasClass('sapUiSizeCompact')?2.5:3;return parseInt(B*C,10);};g.prototype._getBestActionSheetPlacement=function(){var h=this.getHTMLTag();if(h==="Footer"){return sap.m.PlacementType.Top;}else if(h==="Header"){return sap.m.PlacementType.Bottom;}return sap.ui.Device.system.phone?sap.m.PlacementType.Vertical:sap.m.PlacementType.Auto;};g.prototype._getControlsIds=function(){return this.getContent().map(function(i){return i.getId();});};g.prototype._preProcessControl=function(C){if(!(C instanceof S)){return;}if(C.getSelectOnFocus()){C.setProperty("selectOnFocus",false,true);C._origSelectOnFocus=true;}};g.prototype._postProcessControl=function(C){if(!(C instanceof S)){return;}if(typeof C._origSelectOnFocus!=="undefined"){C.setProperty("selectOnFocus",C._origSelectOnFocus,true);delete C._origSelectOnFocus;}};g._getOptimalControlWidth=function(C){var o;if(C instanceof b){o=parseInt(C.$().css('min-width'),10)||0+C.$().outerWidth(true)-C.$().outerWidth();}else{o=C.$().outerWidth(true);}return o;};g._getControlPriority=function(C){if(C.length){return C._priority;}var L=C.getLayoutData&&C.getLayoutData();if(L&&L instanceof O){if(L.getMoveToOverflow()===false){return e.NeverOverflow;}if(L.getStayInOverflow()===true){return e.AlwaysOverflow;}return L.getPriority();}return e.High;};g._getControlIndex=function(C){return C.length?C._index:C.getParent().indexOfContent(C);};g._getControlGroup=function(C){var L=C.getLayoutData();if(L instanceof O){return L.getGroup();}};g._oPriorityOrder=(function(){var p={};p[e.Disappear]=1;p[e.Low]=2;p[e.High]=3;return p;})();return g;},true);
