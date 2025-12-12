import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Check, Loader2, Eye, ZoomIn, ZoomOut, Pencil, ChevronLeft, ChevronRight, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { generateCV, cvThemes, CVTheme, ThemeConfig, generateCVHTML, portfolioData } from "@/lib/cvGenerator";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Step = 'theme' | 'customize' | 'preview';

// Sortable item components
interface SortableSkillItemProps {
  id: string;
  skill: { category: string; items: string[] };
  selectedItems: Set<string>;
  onToggleCategory: () => void;
  onToggleItem: (item: string) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const SortableSkillItem = ({ 
  id, 
  skill, 
  selectedItems, 
  onToggleCategory, 
  onToggleItem,
  isExpanded,
  onToggleExpand
}: SortableSkillItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.8 : 1,
  };

  const selectedCount = skill.items.filter(item => selectedItems.has(`${skill.category}:${item}`)).length;
  const allSelected = selectedCount === skill.items.length;
  const someSelected = selectedCount > 0 && selectedCount < skill.items.length;

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={`rounded-lg transition-colors ${
        isDragging ? 'bg-muted shadow-lg' : ''
      } ${selectedCount === 0 ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded-lg">
        <button
          {...attributes}
          {...listeners}
          className="p-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
          type="button"
        >
          <GripVertical size={14} />
        </button>
        <Checkbox
          id={`skill-${skill.category}`}
          checked={allSelected}
          ref={(el) => {
            if (el && someSelected) {
              (el as any).indeterminate = true;
            }
          }}
          onCheckedChange={onToggleCategory}
        />
        <label 
          htmlFor={`skill-${skill.category}`}
          className="flex-1 cursor-pointer"
        >
          <span className="text-sm font-medium text-foreground">{skill.category}</span>
          <span className="text-xs text-muted-foreground ml-2">
            ({selectedCount}/{skill.items.length})
          </span>
        </label>
        <button
          type="button"
          onClick={onToggleExpand}
          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>
      
      {isExpanded && (
        <div className="ml-10 pl-2 border-l border-border space-y-1 pb-2">
          {skill.items.map(item => {
            const itemKey = `${skill.category}:${item}`;
            return (
              <div 
                key={item}
                className="flex items-center gap-2 py-1 px-2 rounded hover:bg-muted/30"
              >
                <Checkbox
                  id={`skill-item-${itemKey}`}
                  checked={selectedItems.has(itemKey)}
                  onCheckedChange={() => onToggleItem(item)}
                  className="h-3.5 w-3.5"
                />
                <label 
                  htmlFor={`skill-item-${itemKey}`}
                  className="text-xs text-muted-foreground cursor-pointer hover:text-foreground"
                >
                  {item}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

interface SortableExperienceItemProps {
  id: string;
  exp: { title: string; company: string; period: string };
  isSelected: boolean;
  onToggle: () => void;
}

const SortableExperienceItem = ({ id, exp, isSelected, onToggle }: SortableExperienceItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={`flex items-start gap-2 p-2 rounded-lg transition-colors ${
        isDragging ? 'bg-muted shadow-lg' : 'hover:bg-muted/50'
      } ${!isSelected ? 'opacity-50' : ''}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="p-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
        type="button"
      >
        <GripVertical size={14} />
      </button>
      <Checkbox
        id={`exp-${id}`}
        checked={isSelected}
        onCheckedChange={onToggle}
      />
      <label 
        htmlFor={`exp-${id}`}
        className="flex-1 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{exp.title}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {exp.company} • {exp.period}
        </p>
      </label>
    </div>
  );
};

const CVDownloadDialog = () => {
  const [selectedTheme, setSelectedTheme] = useState<CVTheme>('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingFormat, setGeneratingFormat] = useState<'pdf' | 'docx' | null>(null);
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>('theme');
  const [previewScale, setPreviewScale] = useState(0.6);

  // Customization state - now with ordered arrays
  const [customName, setCustomName] = useState(portfolioData.name);
  const [customTitle, setCustomTitle] = useState(portfolioData.title);
  const [customSummary, setCustomSummary] = useState(portfolioData.summary);
  const [selectedProjects, setSelectedProjects] = useState<string[]>(
    portfolioData.projects.map(p => p.name)
  );
  
  // Skills: ordered array of category names, individual items tracked by "category:item" keys
  const [orderedSkills, setOrderedSkills] = useState<string[]>(
    portfolioData.skills.map(s => s.category)
  );
  const [selectedSkillItems, setSelectedSkillItems] = useState<Set<string>>(() => {
    const items = new Set<string>();
    portfolioData.skills.forEach(skill => {
      skill.items.forEach(item => items.add(`${skill.category}:${item}`));
    });
    return items;
  });
  const [expandedSkillCategories, setExpandedSkillCategories] = useState<Set<string>>(new Set());
  
  // Experience: ordered array of indices, selection tracked separately
  const [orderedExperiences, setOrderedExperiences] = useState<number[]>(
    portfolioData.experience.map((_, i) => i)
  );
  const [selectedExperienceIndices, setSelectedExperienceIndices] = useState<Set<number>>(
    new Set(portfolioData.experience.map((_, i) => i))
  );

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const currentTheme = useMemo(() => 
    cvThemes.find(t => t.id === selectedTheme) || cvThemes[0],
    [selectedTheme]
  );

  // Generate custom portfolio data with proper ordering
  const customPortfolioData = useMemo(() => {
    // Filter skills based on selected individual items
    const orderedFilteredSkills = orderedSkills
      .map(category => {
        const originalSkill = portfolioData.skills.find(s => s.category === category)!;
        const filteredItems = originalSkill.items.filter(item => 
          selectedSkillItems.has(`${category}:${item}`)
        );
        return filteredItems.length > 0 ? { ...originalSkill, items: filteredItems } : null;
      })
      .filter(Boolean) as typeof portfolioData.skills;
    
    const orderedFilteredExperiences = orderedExperiences
      .filter(idx => selectedExperienceIndices.has(idx))
      .map(idx => portfolioData.experience[idx]);

    return {
      ...portfolioData,
      name: customName.trim() || portfolioData.name,
      title: customTitle.trim() || portfolioData.title,
      summary: customSummary.trim() || portfolioData.summary,
      projects: portfolioData.projects.filter(p => selectedProjects.includes(p.name)),
      skills: orderedFilteredSkills,
      experience: orderedFilteredExperiences
    };
  }, [customName, customTitle, customSummary, selectedProjects, orderedSkills, selectedSkillItems, orderedExperiences, selectedExperienceIndices]);

  const previewHTML = useMemo(() => 
    generateCVHTML(currentTheme, customPortfolioData),
    [currentTheme, customPortfolioData]
  );

  const handleDownload = async (format: 'pdf' | 'docx') => {
    setIsGenerating(true);
    setGeneratingFormat(format);
    
    try {
      await generateCV(format, selectedTheme, customPortfolioData);
      toast.success(`CV downloaded as ${format.toUpperCase()} successfully!`);
    } catch (error) {
      toast.error("Failed to generate CV. Please try again.");
      console.error(error);
    } finally {
      setIsGenerating(false);
      setGeneratingFormat(null);
    }
  };

  const handleZoomIn = () => setPreviewScale(prev => Math.min(prev + 0.1, 1));
  const handleZoomOut = () => setPreviewScale(prev => Math.max(prev - 0.1, 0.3));

  const toggleProject = (projectName: string) => {
    setSelectedProjects(prev => 
      prev.includes(projectName)
        ? prev.filter(p => p !== projectName)
        : [...prev, projectName]
    );
  };

  const toggleSkillCategory = (category: string) => {
    const skill = portfolioData.skills.find(s => s.category === category)!;
    const categoryItems = skill.items.map(item => `${category}:${item}`);
    const allSelected = categoryItems.every(key => selectedSkillItems.has(key));
    
    setSelectedSkillItems(prev => {
      const next = new Set(prev);
      categoryItems.forEach(key => {
        if (allSelected) {
          next.delete(key);
        } else {
          next.add(key);
        }
      });
      return next;
    });
  };

  const toggleSkillItem = (category: string, item: string) => {
    const key = `${category}:${item}`;
    setSelectedSkillItems(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const toggleSkillExpand = (category: string) => {
    setExpandedSkillCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const toggleExperience = (index: number) => {
    setSelectedExperienceIndices(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleSkillsDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setOrderedSkills(items => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleExperiencesDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setOrderedExperiences(items => {
        const oldIndex = items.indexOf(Number(active.id));
        const newIndex = items.indexOf(Number(over.id));
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const resetCustomization = () => {
    setCustomName(portfolioData.name);
    setCustomTitle(portfolioData.title);
    setCustomSummary(portfolioData.summary);
    setSelectedProjects(portfolioData.projects.map(p => p.name));
    setOrderedSkills(portfolioData.skills.map(s => s.category));
    const allSkillItems = new Set<string>();
    portfolioData.skills.forEach(skill => {
      skill.items.forEach(item => allSkillItems.add(`${skill.category}:${item}`));
    });
    setSelectedSkillItems(allSkillItems);
    setExpandedSkillCategories(new Set());
    setOrderedExperiences(portfolioData.experience.map((_, i) => i));
    setSelectedExperienceIndices(new Set(portfolioData.experience.map((_, i) => i)));
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setCurrentStep('theme');
    }
  };

  const ThemeCard = ({ theme }: { theme: ThemeConfig }) => {
    const isSelected = selectedTheme === theme.id;
    
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedTheme(theme.id)}
        className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
          isSelected 
            ? 'border-primary ring-2 ring-primary/30' 
            : 'border-border hover:border-muted-foreground/50'
        }`}
      >
        <div 
          className="h-24 w-full"
          style={{ background: theme.previewBg }}
        />
        <div className="p-3 bg-card">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-sm text-foreground">{theme.name}</h4>
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check size={12} className="text-primary-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="text-xs text-muted-foreground">{theme.description}</p>
        </div>
      </motion.div>
    );
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-4">
      {(['theme', 'customize', 'preview'] as Step[]).map((step, index) => (
        <div key={step} className="flex items-center">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              currentStep === step 
                ? 'bg-primary text-primary-foreground' 
                : index < ['theme', 'customize', 'preview'].indexOf(currentStep)
                ? 'bg-primary/20 text-primary'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {index + 1}
          </div>
          {index < 2 && (
            <div className={`w-8 h-0.5 mx-1 ${
              index < ['theme', 'customize', 'preview'].indexOf(currentStep)
                ? 'bg-primary'
                : 'bg-muted'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button 
            className="gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
          >
            <Download size={18} />
            Download CV
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl bg-background border-border max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <FileText className="text-primary" size={24} />
              {currentStep === 'theme' && 'Choose CV Theme'}
              {currentStep === 'customize' && 'Customize Your CV'}
              {currentStep === 'preview' && 'Preview & Download'}
            </DialogTitle>
          </DialogHeader>

          <StepIndicator />
          
          <ScrollArea className="flex-1 pr-4">
            <AnimatePresence mode="wait">
              {/* Step 1: Theme Selection */}
              {currentStep === 'theme' && (
                <motion.div
                  key="theme"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-4">
                    {cvThemes.map((theme) => (
                      <ThemeCard key={theme.id} theme={theme} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Customization */}
              {currentStep === 'customize' && (
                <motion.div
                  key="customize"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 my-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="cv-name" className="text-sm font-medium">Full Name</Label>
                    <Input
                      id="cv-name"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Your full name"
                      maxLength={100}
                      className="bg-card"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cv-title" className="text-sm font-medium">Job Title</Label>
                    <Input
                      id="cv-title"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      placeholder="Your job title"
                      maxLength={100}
                      className="bg-card"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cv-summary" className="text-sm font-medium">Professional Summary</Label>
                    <Textarea
                      id="cv-summary"
                      value={customSummary}
                      onChange={(e) => setCustomSummary(e.target.value)}
                      placeholder="Brief professional summary..."
                      maxLength={500}
                      rows={4}
                      className="bg-card resize-none"
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {customSummary.length}/500
                    </p>
                  </div>

                  {/* Skills Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Skills (drag to reorder, click to expand)</Label>
                      <span className="text-xs text-muted-foreground">
                        {selectedSkillItems.size} items selected
                      </span>
                    </div>
                    <div className="space-y-1 max-h-64 overflow-y-auto rounded-lg border border-border p-2 bg-card">
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleSkillsDragEnd}
                      >
                        <SortableContext items={orderedSkills} strategy={verticalListSortingStrategy}>
                          {orderedSkills.map(category => {
                            const skill = portfolioData.skills.find(s => s.category === category)!;
                            return (
                              <SortableSkillItem
                                key={category}
                                id={category}
                                skill={skill}
                                selectedItems={selectedSkillItems}
                                onToggleCategory={() => toggleSkillCategory(category)}
                                onToggleItem={(item) => toggleSkillItem(category, item)}
                                isExpanded={expandedSkillCategories.has(category)}
                                onToggleExpand={() => toggleSkillExpand(category)}
                              />
                            );
                          })}
                        </SortableContext>
                      </DndContext>
                    </div>
                  </div>

                  {/* Experience Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Experience (drag to reorder)</Label>
                      <span className="text-xs text-muted-foreground">
                        {selectedExperienceIndices.size} of {portfolioData.experience.length} selected
                      </span>
                    </div>
                    <div className="space-y-1 max-h-48 overflow-y-auto rounded-lg border border-border p-2 bg-card">
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleExperiencesDragEnd}
                      >
                        <SortableContext items={orderedExperiences.map(String)} strategy={verticalListSortingStrategy}>
                          {orderedExperiences.map(idx => {
                            const exp = portfolioData.experience[idx];
                            return (
                              <SortableExperienceItem
                                key={idx}
                                id={String(idx)}
                                exp={exp}
                                isSelected={selectedExperienceIndices.has(idx)}
                                onToggle={() => toggleExperience(idx)}
                              />
                            );
                          })}
                        </SortableContext>
                      </DndContext>
                    </div>
                  </div>

                  {/* Projects Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Select Projects to Include</Label>
                      <span className="text-xs text-muted-foreground">
                        {selectedProjects.length} of {portfolioData.projects.length} selected
                      </span>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto rounded-lg border border-border p-3 bg-card">
                      {portfolioData.projects.map((project) => (
                        <div 
                          key={project.name}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <Checkbox
                            id={`project-${project.name}`}
                            checked={selectedProjects.includes(project.name)}
                            onCheckedChange={() => toggleProject(project.name)}
                          />
                          <label 
                            htmlFor={`project-${project.name}`}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground">{project.name}</span>
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                project.contribution === 'Full-Stack' 
                                  ? 'bg-purple-500/20 text-purple-400' 
                                  : 'bg-blue-500/20 text-blue-400'
                              }`}>
                                {project.contribution}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1">{project.technologies}</p>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetCustomization}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Reset to default
                  </Button>
                </motion.div>
              )}

              {/* Step 3: Preview */}
              {currentStep === 'preview' && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="my-4"
                >
                  {/* Zoom Controls */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleZoomOut}
                      disabled={previewScale <= 0.3}
                      className="h-8 w-8"
                    >
                      <ZoomOut size={16} />
                    </Button>
                    <span className="text-sm text-muted-foreground min-w-[50px] text-center">
                      {Math.round(previewScale * 100)}%
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleZoomIn}
                      disabled={previewScale >= 1}
                      className="h-8 w-8"
                    >
                      <ZoomIn size={16} />
                    </Button>
                  </div>

                  {/* Preview */}
                  <div className="bg-muted/30 rounded-lg p-4 overflow-auto max-h-[400px]">
                    <div className="flex justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-lg shadow-xl overflow-hidden"
                        style={{ 
                          transform: `scale(${previewScale})`,
                          transformOrigin: 'top center',
                          width: '800px'
                        }}
                      >
                        <iframe
                          srcDoc={previewHTML}
                          className="w-full border-0"
                          style={{ height: '1100px' }}
                          title="CV Preview"
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>

          {/* Navigation & Download Buttons */}
          <div className="flex flex-col gap-3 pt-4 border-t border-border mt-4">
            <div className="flex justify-between gap-3">
              {currentStep !== 'theme' && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep === 'preview' ? 'customize' : 'theme')}
                  className="gap-2"
                >
                  <ChevronLeft size={16} />
                  Back
                </Button>
              )}
              
              {currentStep === 'theme' && (
                <Button
                  onClick={() => setCurrentStep('customize')}
                  className="gap-2 ml-auto"
                >
                  Customize CV
                  <Pencil size={16} />
                </Button>
              )}
              
              {currentStep === 'customize' && (
                <Button
                  onClick={() => setCurrentStep('preview')}
                  className="gap-2 ml-auto"
                  disabled={selectedProjects.length === 0 || selectedSkillItems.size === 0 || selectedExperienceIndices.size === 0}
                >
                  Preview CV
                  <Eye size={16} />
                </Button>
              )}
            </div>

            {currentStep === 'preview' && (
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => handleDownload('pdf')}
                  disabled={isGenerating}
                  className="flex-1 gap-2 bg-red-500 hover:bg-red-600 text-white"
                >
                  {generatingFormat === 'pdf' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <FileText size={18} />
                      Download as PDF
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => handleDownload('docx')}
                  disabled={isGenerating}
                  className="flex-1 gap-2 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {generatingFormat === 'docx' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Generating DOCX...
                    </>
                  ) : (
                    <>
                      <FileText size={18} />
                      Download as DOCX
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CVDownloadDialog;
